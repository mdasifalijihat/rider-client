import React from 'react';
import Banner from '../Banner/Banner';
import WorkBanner from '../WorkBanner/WorkBanner';
import OurSerBanner from '../OurSerBanner/OurSerBanner';
import TeamsSales from '../TeamsSales/TeamsSales';
import ParcelBanner from '../ParcelBanner/ParcelBanner';
import MerchantBanner from '../MerchantBanner/MerchantBanner';
import ReviewBanner from '../ReviewBanner/ReviewBanner';
import FaqBanner from '../FaqBanner/FaqBanner';

const Home = () => {
    return (
        <div>
            <div className='py-2'><Banner></Banner></div>
            <WorkBanner></WorkBanner>
            <OurSerBanner></OurSerBanner>
            <TeamsSales></TeamsSales>
            <ParcelBanner></ParcelBanner>
            <MerchantBanner></MerchantBanner>
            <ReviewBanner></ReviewBanner>
            <FaqBanner></FaqBanner>
        </div>
    );
};

export default Home;