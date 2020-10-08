import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentCard from './PaymentCard';
import SplitForm from './SplitForm';

const stripePromise = loadStripe('pk_test_51HZuu8L2Eb4HEaVe78h9UUQf1DIYLK6AxtrpG9yj9gFcIrMf6X1tHG40fkmBc5dgeiVl8tLqDE5MhbuiHcITbkxm00sYEdBj80');


const ProcessPayment = () => {
    return (
        <Elements stripe={stripePromise}>
            {/* <PaymentCard></PaymentCard> */}
            <SplitForm></SplitForm>
        </Elements>
    );
};

export default ProcessPayment;


