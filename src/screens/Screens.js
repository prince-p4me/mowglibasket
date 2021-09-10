import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../components/splash/Splash';
import AuthScreens from './Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetails from '../components/products/productDetails/ProductDetails';
import DrawerScreens from './DrawerScreens'
import { Context as AuthContext } from '../context/AuthContext'
import LandingScreen from '../components/landing/LandingScreen'
import PrimeMemberForm from '../components/primeMember/primeMemberForm/PrimeMemberForm'
import SelectHomeAddress from '../components/address/SelectHomeAddress';
import AreaList from '../components/address/AreaList'
import AddressList from '../components/address/AddressList'
import AddAddress from '../components/address/AddAddress'
import EditAddress from '../components/address/EditAddress'
import ChooseDeliveryAddress from '../components/address/ChooseDeliveryAddress'
import PrimeMemberSuccess from '../components/primeMember/primeMemberForm/PrimeMemberSuccess';
import ServicesList from '../components/primeMember/services/ServicesList';
import ServicRequestSuccess from '../components/primeMember/services/ServiceRequestSuccess';
import SelectAddressType from '../components/primeMember/primeMemberForm/SelectAddressType'
import ContactForm from '../components/primeMember/contactForm/ContactForm'
import ContactSuccess from '../components/primeMember/contactForm/ContactSuccess';
import OTP from '../components/primeMember/primeMemberForm/OTP';
import PrimeMembershipCheckout from '../components/primeMember/primeMemberForm/PrimeMembershipCheckout';
import PrimeLogin from '../components/primeMember/primeMemberForm/PrimeLogin';
import PrimeTerms from '../components/primeMember/primeMemberForm/PrimeTerms'
import Policy from '../components/login/Policy'
import TimeSlots from '../components/primeMember/services/TimeSlots';
import AmountToPay from '../components/primeMember/servicePayment/AmountToPay';
import PaymentCheckout from '../components/primeMember/servicePayment/PaymentCheckout';
import PrimeLoginSignUpInfo from '../components/primeMember/primeMemberForm/PrimeLoginSignUpInfo';
import DiscountedProductList from '../components/discountedProducts/DiscountedProductList';
import AreaListContainer from '../components/address/AreaListContainer';

const Screens = (props) => {

    const { state: { user, guest, splashLoaded }, updateUser } = useContext(AuthContext)

    useEffect(() => {
        async function checkUserLogin() {
            let data = await AsyncStorage.getItem('@user');
            if (data) {
                let userData = JSON.parse(data)
                updateUser(userData)
            }
        }
        checkUserLogin()
    }, [])

    const rootStack = createStackNavigator()

    return (
        <rootStack.Navigator headerMode='none'>
            {
                !splashLoaded
                    ?
                    <rootStack.Screen name="splash" component={Splash} options={{ headerShown: false }} />
                    :
                    <>
                        {
                            !user && !guest &&
                            <rootStack.Screen name="authScreen" component={AuthScreens} options={{ headerShown: false }} />
                        }
                        <rootStack.Screen name="landingScreen" component={LandingScreen} options={{ headerShown: false }} />
                        <rootStack.Screen name="drawer" options={{ headerShown: false }} >
                            {props => <DrawerScreens {...props} />}
                        </rootStack.Screen>
                        <rootStack.Screen name="productDetail" component={ProductDetails} options={{ headerShown: false }} />
                        <rootStack.Screen name="discountedProductList" component={DiscountedProductList} options={{ headerShown: false }} />
                        <rootStack.Screen name="addressType" component={SelectAddressType} options={{ headerShown: false }} />
                        <rootStack.Screen name="primLoginSignUpInfo" component={PrimeLoginSignUpInfo} options={{ headerShown: false }} />
                        <rootStack.Screen name="contactForm" component={ContactForm} options={{ headerShown: false }} />
                        <rootStack.Screen name="contactSuccess" component={ContactSuccess} options={{ headerShown: false }} />
                        <rootStack.Screen name="primeMemberForm" component={PrimeMemberForm} options={{ headerShown: false }} />
                        <rootStack.Screen name="primeTerms" component={PrimeTerms} options={{ headerShown: false }} />
                        <rootStack.Screen name="primePolicy" component={Policy} options={{ headerShown: false }} />
                        <rootStack.Screen name="primeLogin" component={PrimeLogin} options={{ headerShown: false }} />
                        <rootStack.Screen name="primeMemberFormOTP" component={OTP} options={{ headerShown: false }} />
                        <rootStack.Screen name="selectHomeAddress" component={SelectHomeAddress} options={{ headerShown: false }} />
                        <rootStack.Screen name="addressList" component={AddressList} options={{ headerShown: false }} />
                        {/* <rootStack.Screen name="areaList" component={AreaList} options={{ headerShown: false }} /> */}
                        <rootStack.Screen name='areaList' component={AreaListContainer} options={{ headerShown: false }} />
                        <rootStack.Screen name="addAddress" component={AddAddress} options={{ headerShown: false }} />
                        <rootStack.Screen name="editAddress" component={EditAddress} options={{ headerShown: false }} />
                        <rootStack.Screen name="chooseDelivery" component={ChooseDeliveryAddress} options={{ headerShown: false }} />
                        <rootStack.Screen name="membershipCheckout" component={PrimeMembershipCheckout} options={{ headerShown: false }} />
                        <rootStack.Screen name="membershipSuccess" component={PrimeMemberSuccess} options={{ headerShown: false }} />
                        <rootStack.Screen name="services" component={ServicesList} options={{ headerShown: false }} />
                        <rootStack.Screen name="timeSlots" component={TimeSlots} options={{ headerShown: false }} />
                        <rootStack.Screen name="servicesRequestSuccess" component={ServicRequestSuccess} options={{ headerShown: false }} />
                        <rootStack.Screen name="amountToPay" component={AmountToPay} options={{ headerShown: false }} />
                        <rootStack.Screen name="paymentCheckout" component={PaymentCheckout} options={{ headerShown: false }} />
                        <rootStack.Screen name="authentication" component={AuthScreens} options={{ headerShown: false }} options={{ headerShown: false }} />
                    </>
                // :
                // <rootStack.Screen name="authScreen" component={AuthScreens} options={{ headerShown: false }} />
            }
        </rootStack.Navigator>
    )
}

export default Screens