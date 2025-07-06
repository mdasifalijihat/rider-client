import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const districts = useLoaderData();
  const { user } = useAuth();

  /* ---------------- form ---------------- */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  /* ---------------- UI states ---------------- */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [costBreakdown, setCostBreakdown] = useState("");

  /* ---------------- dropdown data ---------------- */
  const [regions, setRegions] = useState([]);
  const [serviceCenters, setServiceCenters] = useState([]);

  /* -------- transform loader data once -------- */
  useEffect(() => {
    if (!Array.isArray(districts)) return;

    /* ❶ unique region list */
    const regionNames = [...new Set(districts.map((d) => d.region))];
    const regionObjects = regionNames.map((name, idx) => ({
      id: idx + 1,
      name,
    }));
    setRegions(regionObjects);

    /* ❷ make a flat list of service centers from covered_area */
    const centers = districts.flatMap((d) =>
      d.covered_area.map((area, idx) => ({
        id: `${d.region}-${idx}-${area}`,
        name: area,
        regionName: d.region,
        regionId: regionObjects.find((r) => r.name === d.region)?.id || 0,
      }))
    );
    setServiceCenters(centers);
  }, [districts]);

  /* -------- helpers -------- */
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const parcelType = watch("parcelType");

  const generateTrackingNumber = () => {
    const prefix = "TRK";
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}${randomNum}`;
  };

  const calculateCost = (data) => {
    const senderCenter = serviceCenters.find(
      (sc) => sc.id === data.senderServiceCenter
    );
    const receiverCenter = serviceCenters.find(
      (sc) => sc.id === data.receiverServiceCenter
    );

    let cost = 0;
    const breakdown = [];

    // base cost
    if (data.parcelType === "document") {
      cost += 50;
      breakdown.push("📄 Document Base Cost: ৳50");
    } else {
      cost += 100;
      breakdown.push("📦 Non-Document Base Cost: ৳100");
    }

    // weight cost (only for non-documents)
    if (data.parcelType === "non-document" && data.weight) {
      const weight = parseFloat(data.weight);
      const extraWeightCost = Math.max(0, weight - 1) * 20;
      if (extraWeightCost > 0) {
        cost += extraWeightCost;
        breakdown.push(
          `⚖️ Extra Weight Charge: ৳${extraWeightCost} (for ${weight}kg)`
        );
      }
    }

    // inter-region cost
    if (
      senderCenter &&
      receiverCenter &&
      senderCenter.regionName !== receiverCenter.regionName
    ) {
      cost += 150;
      breakdown.push("🚚 Inter-Region Delivery Charge: ৳150");
    }

    // insurance cost
    if (data.insurance) {
      cost += 50;
      breakdown.push("🛡️ Insurance: ৳50");
    }

    return {
      cost,
      breakdownText: breakdown.join("\n"),
    };
  };

  const onSubmit = (data) => {
    const { cost, breakdownText } = calculateCost(data);
    setDeliveryCost(cost);
    setCostBreakdown(breakdownText);
    setShowConfirmation(true);
  };

  const confirmSubmission = async () => {
    setIsSubmitting(true);
    try {
      const formData = {
        ...watch(),
        cost: deliveryCost,
        createdBy: user.email,
        status: "pending",
        paymentStatus: "unpaid",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trackingNumber: generateTrackingNumber(),
        statusHistory: [
          {
            status: "pending",
            timestamp: new Date().toISOString(),
            location: watch("senderServiceCenter"),
          },
        ],
        ...(parcelType === "non-document" && {
          dimensions: {
            length: watch("length"),
            width: watch("width"),
            height: watch("height"),
            weight: watch("weight"),
          },
        }),
        options: {
          signatureRequired: watch("signatureRequired") || false,
          insurance: watch("insurance") || false,
          deliverySpeed: watch("deliverySpeed") || "standard",
        },
      };

      await axios.post("/api/parcels", formData);

      toast.success(
        `✅ Parcel Created Successfully!\n\nTracking Number: ${formData.trackingNumber}\nTotal Cost: ৳${deliveryCost}\n\nBreakdown:\n${costBreakdown}`,
        { autoClose: 8000 }
      );

      reset();
      setShowConfirmation(false);
    } catch (error) {
      console.error("Parcel submission error:", error);
      toast.error(
        error.response?.data?.message || "❌ Failed to create parcel"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Parcel</h1>
        <p className="text-gray-600">
          Door-to-door delivery requires both pickup and delivery details.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* --- Parcel Info --- */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Parcel Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Type*</label>
              <select
                {...register("parcelType", { required: "Required" })}
                className="select select-bordered w-full"
              >
                <option value="">Select</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.parcelType && (
                <p className="text-error text-sm mt-1">
                  {errors.parcelType.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Title*</label>
              <input
                type="text"
                {...register("title", {
                  required: "Required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-error text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {parcelType === "non-document" && (
              <div>
                <label className="block mb-1 font-medium">Weight (kg)*</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  {...register("weight", {
                    required: "Weight is required for non-documents",
                    min: {
                      value: 0.1,
                      message: "Weight must be at least 0.1kg",
                    },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.weight && (
                  <p className="text-error text-sm mt-1">
                    {errors.weight.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {parcelType === "non-document" && (
            <>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block mb-1 font-medium">Length (cm)</label>
                  <input
                    type="number"
                    {...register("length", {
                      min: {
                        value: 1,
                        message: "Length must be at least 1cm",
                      },
                    })}
                    className="input input-bordered w-full"
                    min="1"
                  />
                  {errors.length && (
                    <p className="text-error text-sm mt-1">
                      {errors.length.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Width (cm)</label>
                  <input
                    type="number"
                    {...register("width", {
                      min: {
                        value: 1,
                        message: "Width must be at least 1cm",
                      },
                    })}
                    className="input input-bordered w-full"
                    min="1"
                  />
                  {errors.width && (
                    <p className="text-error text-sm mt-1">
                      {errors.width.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Height (cm)</label>
                  <input
                    type="number"
                    {...register("height", {
                      min: {
                        value: 1,
                        message: "Height must be at least 1cm",
                      },
                    })}
                    className="input input-bordered w-full"
                    min="1"
                  />
                  {errors.height && (
                    <p className="text-error text-sm mt-1">
                      {errors.height.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="block mb-1 font-medium">Delivery Options</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("signatureRequired")}
                    className="checkbox checkbox-primary mr-2"
                  />
                  <span>Signature Required</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("insurance")}
                    className="checkbox checkbox-primary mr-2"
                  />
                  <span>Add Insurance (+৳50)</span>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Delivery Speed</label>
                  <select
                    {...register("deliverySpeed")}
                    className="select select-bordered w-full"
                  >
                    <option value="standard">Standard (3-5 days)</option>
                    <option value="express">Express (1-2 days)</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>

        {/* --- Sender Info --- */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Sender Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name*</label>
              <input
                type="text"
                {...register("senderName", {
                  required: "Required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.senderName && (
                <p className="text-error text-sm mt-1">
                  {errors.senderName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Contact*</label>
              <input
                type="tel"
                {...register("senderContact", {
                  required: "Required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Invalid phone number (must be 11 digits)",
                  },
                })}
                className="input input-bordered w-full"
                placeholder="01XXXXXXXXX"
              />
              {errors.senderContact && (
                <p className="text-error text-sm mt-1">
                  {errors.senderContact.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Region*</label>
              <select
                {...register("senderRegion", { required: "Required" })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              {errors.senderRegion && (
                <p className="text-error text-sm mt-1">
                  {errors.senderRegion.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Service Center*</label>
              <select
                {...register("senderServiceCenter", { required: "Required" })}
                className="select select-bordered w-full"
                disabled={!senderRegion}
              >
                <option value="">Select Center</option>
                {serviceCenters
                  .filter((sc) => sc.regionId === parseInt(senderRegion))
                  .map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.name}
                    </option>
                  ))}
              </select>
              {errors.senderServiceCenter && (
                <p className="text-error text-sm mt-1">
                  {errors.senderServiceCenter.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Address*</label>
              <textarea
                {...register("senderAddress", {
                  required: "Required",
                  minLength: {
                    value: 10,
                    message: "Address must be at least 10 characters",
                  },
                })}
                rows={3}
                className="textarea textarea-bordered w-full"
                placeholder="Full address including area, road, and house number"
              ></textarea>
              {errors.senderAddress && (
                <p className="text-error text-sm mt-1">
                  {errors.senderAddress.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">
                Pickup Instructions
              </label>
              <textarea
                {...register("pickupInstructions")}
                rows={2}
                className="textarea textarea-bordered w-full"
                placeholder="Any special instructions for pickup"
              ></textarea>
            </div>
          </div>
        </div>

        {/* --- Receiver Info --- */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Receiver Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name*</label>
              <input
                type="text"
                {...register("receiverName", {
                  required: "Required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.receiverName && (
                <p className="text-error text-sm mt-1">
                  {errors.receiverName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Contact*</label>
              <input
                type="tel"
                {...register("receiverContact", {
                  required: "Required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Invalid phone number (must be 11 digits)",
                  },
                })}
                className="input input-bordered w-full"
                placeholder="01XXXXXXXXX"
              />
              {errors.receiverContact && (
                <p className="text-error text-sm mt-1">
                  {errors.receiverContact.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Region*</label>
              <select
                {...register("receiverRegion", { required: "Required" })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              {errors.receiverRegion && (
                <p className="text-error text-sm mt-1">
                  {errors.receiverRegion.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Service Center*</label>
              <select
                {...register("receiverServiceCenter", { required: "Required" })}
                className="select select-bordered w-full"
                disabled={!receiverRegion}
              >
                <option value="">Select Center</option>
                {serviceCenters
                  .filter((sc) => sc.regionId === parseInt(receiverRegion))
                  .map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.name}
                    </option>
                  ))}
              </select>
              {errors.receiverServiceCenter && (
                <p className="text-error text-sm mt-1">
                  {errors.receiverServiceCenter.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Address*</label>
              <textarea
                {...register("receiverAddress", {
                  required: "Required",
                  minLength: {
                    value: 10,
                    message: "Address must be at least 10 characters",
                  },
                })}
                rows={3}
                className="textarea textarea-bordered w-full"
                placeholder="Full address including area, road, and house number"
              ></textarea>
              {errors.receiverAddress && (
                <p className="text-error text-sm mt-1">
                  {errors.receiverAddress.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">
                Delivery Instructions
              </label>
              <textarea
                {...register("deliveryInstructions")}
                rows={2}
                className="textarea textarea-bordered w-full"
                placeholder="Any special instructions for delivery"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Submitting...
              </>
            ) : (
              "Submit Parcel"
            )}
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Parcel Details</h3>
            <p className="py-2 font-semibold">Delivery Cost: ৳{deliveryCost}</p>
            <pre className="bg-gray-100 p-3 text-sm rounded whitespace-pre-wrap">
              {costBreakdown}
            </pre>
            <div className="modal-action">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="btn btn-outline"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSubmission}
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Processing...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendParcel;