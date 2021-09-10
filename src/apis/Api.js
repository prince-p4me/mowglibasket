import { log } from '../common/Utils'

const BASE_URL = 'https://mowglibasket.com/wp-json/store_api_demo/v1'

const register = (name, email, phone, fcmToken, keyhash, deviceType, code) => {
    let jsonRequest = {
        full_name: name,
        email: email,
        phone: phone,
        fcm_token: fcmToken,
        key_hash: keyhash,
        device_type: deviceType,
        referral_code: code
    }
    return new Promise((response, error) => {

        fetch(BASE_URL + "/users_registration", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const verifyOTP = (id, otp) => {
    let jsonRequest = {
        user_id: id,
        otp: otp
    }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/otp_verification", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const resendOTP = (id) => {
    let jsonRequest = {
        user_id: id
    }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/resend_otp", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const login = (name, fcmToken, keyhash, deviceType) => {
    let jsonRequest = {
        username: name,
        fcm_token: fcmToken,
        key_hash: keyhash,
        device_type: deviceType
    }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/users_login", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })

}

// Deprecated
const submitPin = (id, pin) => {
    let jsonRequest = {
        user_id: id,
        zipcode: pin
    }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/zipcode", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

//Deprecated
const home = (userId) => {
    // let jsonRequest = {
    //     user_id: id
    // }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/homepage?" + new URLSearchParams({ user_id: userId }), {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            // body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}
const homeNew = (userId) => {
    // let jsonRequest = {
    //     user_id: id
    // }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/home_page_manager_app?" + new URLSearchParams({ user_id: userId }), {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            // body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                // log("url", response.url)F
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}
const homeCopy = (userId) => {
    // let jsonRequest = {
    //     user_id: id
    // }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/home_page_manager_copy?" + new URLSearchParams({ user_id: userId }), {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            // body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                // log("url", response.url)
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log('url', response.url)
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const productDetail = (id) => {
    let jsonRequest = {
        product_id: id
    }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/single_product", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const subCategories = (id) => {
    let jsonRequest = {
        category_id: id
    }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/categories", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const offers = () => {

    return new Promise((response, error) => {
        fetch(BASE_URL + "/offers", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            // body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                // log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const termsAndConditions = () => {

    return new Promise((response, error) => {
        fetch(BASE_URL + "/terms_conditions", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
        })
            .then(response => {
                log("url", response.url)
                // log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const privacyPolicy = () => {

    return new Promise((response, error) => {
        fetch(BASE_URL + "/privacy_policy", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
        })
            .then(response => {
                log("url", response.url)
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const myAccount = (id) => {
    let jsonRequest = {
        user_id: id
    }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/user_account", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const userDetails = (id) => {
    let jsonRequest = {
        user_id: id
    }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/update_profile", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const updateUserDetails = (id, firstName, lastName, dob, emailSubscription) => {
    let jsonRequest = {
        user_id: id,
        first_name: firstName,
        last_name: lastName,
        user_dob: dob, // date format should be yyyy/mm/dd
        email_subscription: emailSubscription  //value should be 0 or 1
    }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/update_profile", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const myOrders = (id, pageNo) => {
    let jsonRequest = {
        user_id: id,
        page_no: pageNo
    }
    return new Promise((response, error) => {
        fetch(BASE_URL + "/get_orders", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const orderDetails = (id) => {

    let jsonRequest = {
        order_id: id
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/order_info", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const productListByCategoryId = (id) => {

    let jsonRequest = {
        category_id: id
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/products_by_category", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const categoriesList = () => {

    return new Promise((response, error) => {
        fetch(BASE_URL + "/categories_list", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
        })
            .then(response => {
                log("url", response.url)
                // log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

// Deprecated
const searchProducts = (searchKeyword, pageNo) => {

    let jsonRequest = {
        keyword: searchKeyword,
        page_no: pageNo
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/search", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const productList = (jsonRequest) => {

    return new Promise((response, error) => {

        fetch(BASE_URL + "/products_list", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const filterParams = (jsonRequest) => {

    return new Promise((response, error) => {

        fetch(BASE_URL + "/filters", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const cartListing = (id) => {

    let jsonRequest = {
        user_id: id
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/cart", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const addToCart = (productId, variationId, quantity) => {

    let jsonRequest = {
        product_id: productId,
        variation_id: variationId,
        quantity: quantity
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/cart", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const updateCart = (key, quantity) => {

    let jsonRequest = {
        key: key,
        quantity: quantity
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/cart", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const addToCartVariations = (productId, variationId, quantity) => {

    let jsonRequest = {
        // user_id: id,
        product_id: productId,
        variation_id: variationId,
        quantity: quantity
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/cart", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const removeFromCart = (productKey) => {

    let jsonRequest = {
        // user_id: id,
        product_key: productKey
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/remove_cart_products", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const clearCart = () => {

    // let jsonRequest = {
    //     user_id: id
    // }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/remove_cart_products", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            // body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                // log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const addressList = (id) => {

    let jsonRequest = {
        user_id: id
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/address", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const stateList = (id) => {

    let jsonRequest = {
        user_id: id,
        type: "add"
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/address", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const addAddress = (id, address, area, locationOnMap, setDefaultAddress) => {

    let jsonRequest = {
        user_id: id,
        type: "add",
        first_name: address.first_name,
        last_name: address.last_name,
        address_1: address.address_1,
        address_2: address.address_2,
        city: area.city,
        state: area.state_code,
        postcode: area.pincode,
        country: area.country,
        default: setDefaultAddress,
        billing_area_id: area.id,
        latitude: locationOnMap ? locationOnMap.latitude : null,
        longitude: locationOnMap ? locationOnMap.longitude : null
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/address", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const getAddressDetail = (id, addressId) => {

    let jsonRequest = {
        user_id: id,
        type: "edit",
        address_id: addressId
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/address", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const editAddress = (id, address, locationOnMap) => {

    let jsonRequest = {
        user_id: id,
        address_id: address.id,
        first_name: address.first_name,
        last_name: address.last_name,
        address_1: address.address_1,
        address_2: address.address_2,
        city: address.city,
        state: address.state_code,
        postcode: address.postcode,
        country: "India",
        type: "edit",
        default: address.default,
        latitude: address.latitude ? address.latitude : locationOnMap ? locationOnMap.latitude : null,
        longitude: address.longitude ? address.longitude : locationOnMap ? locationOnMap.longitude : null
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/address", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const deleteAddress = (id, addressId) => {

    let jsonRequest = {
        user_id: id,
        address_id: addressId
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/delete_address", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const getCheckoutParams = (id, addressId) => {

    let jsonRequest = {
        user_id: id,
        address_id: addressId
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/checkout", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const checkout = (id, addressId, payment, timeSlot, data) => {
    let jsonRequest
    if (data.coupon_name) {
        jsonRequest = {
            user_id: id,
            address_id: addressId,
            payment_method: payment,
            time_slot: timeSlot,
            coupon_code: data.coupon_name,
            discount: data.discount,
            cart_total: data.cart_total
        }
    } else if (data.referral_discount_label) {
        jsonRequest = {
            user_id: id,
            address_id: addressId,
            payment_method: payment,
            time_slot: timeSlot,
            referral_discount_label: data.referral_discount_label,
            discount: data.discount,
            cart_total: data.cart_total
        }
    } else {
        jsonRequest = {
            user_id: id,
            address_id: addressId,
            payment_method: payment,
            time_slot: timeSlot
        }
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/checkout", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const updatePaymentResponse = (id, status, orderId, paymentResponse) => {

    let jsonRequest = {
        user_id: id,
        status: status,
        order_id: orderId,
        razorpay_response_data: paymentResponse
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/razorpay_response", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const notifications = (pageNo) => {

    let jsonRequest = {
        page_no: pageNo
    }

    return new Promise((response, error) => {
        fetch(BASE_URL + "/notifications_list", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const getAreaList = () => {

    return new Promise((response, error) => {
        fetch(BASE_URL + "/areas_list", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            // body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const applyCoupon = (id, coupon) => {

    let jsonRequest = {
        user_id: id,
        coupon_code: coupon
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/add_porduct_coupon_code", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const settings = (userId) => {
    return new Promise((response, error) => {
        fetch(BASE_URL + '/settings?' + new URLSearchParams({ user_id: userId }), {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
        })
            .then(response => {
                log("url", response.url)
                // log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const readeemPoints = (userId, addressId, points) => {

    let jsonRequest = {
        user_id: userId,
        address_id: addressId,
        spend_referral_points: points
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/checkout", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const getPrimeCheckoutDetails = (id) => {

    let jsonRequest = {
        user_id: id
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/prime_membership_checkout",
            {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(jsonRequest)
            })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const getPrimeCheckoutpaymentDetails = (id) => {

    let jsonRequest = {
        user_id: id,
        payment_method: "razorpay"
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/prime_membership_checkout",
            {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(jsonRequest)
            })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const updatePrimePaymentResponse = (id, status, checkoutData, paymentResponse, address) => {

    let jsonRequest = {
        user_id: id,
        status: status,
        payment_details: checkoutData.payment_details,
        razorpay_response_data: paymentResponse,
        address: address
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/prime_membership_payment_response", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const getServicesList = (id) => {

    let jsonRequest = {
        user_id: id
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/prime_membership_services", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const primeTermsAndConditions = () => {

    return new Promise((response, error) => {
        fetch(BASE_URL + "/prime_membership_terms", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
        })
            .then(response => {
                log("url", response.url)
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const requestAServices = (id, service, date, time) => {

    let jsonRequest

    if (!date && !time) {
        jsonRequest = {
            user_id: id,
            service_id: service.id
        }
    } else {
        jsonRequest = {
            user_id: id,
            service_id: service.id,
            service_date: date.date,
            service_time_slot_id: time.id,
        }
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/service_request", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const requestOrderAndPaymentDetails = (id, orderId, amount) => {

    let jsonRequest = {
        user_id: id,
        order_id: orderId,
        amount: amount,
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/service_checkout", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const readeemPointsServiceCheckout = (userId, orderId, points, amount) => {

    let jsonRequest = {
        user_id: userId,
        order_id: orderId,
        spend_referral_points: points,
        amount: amount
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/service_checkout", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const requestServiceCheckoutPaymentParams = (userId, orderId, serviceId, amount, paymentMethod, discount) => {

    let jsonRequest = {
        user_id: userId,
        order_id: orderId,
        service_id: serviceId,
        amount: amount,
        payment_method: paymentMethod,
        discount: discount
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/service_checkout", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const requestServicePaymentResponseUpdate = (id, status, orderId, paymentResponse) => {

    let jsonRequest = {
        user_id: id,
        status: status,
        order_id: orderId,
        razorpay_response_data: paymentResponse
    }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/service_razorpay_response", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest)
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

const contactUs = (user, name, email, phone, message) => {

    let jsonRequest
    if (user)
        jsonRequest = {
            full_name: name,
            email: email,
            phone: phone,
            message: message,
            user_id: user.user_id
        }
    else
        jsonRequest = {
            full_name: name,
            email: email,
            phone: phone,
            message: message
        }

    return new Promise((response, error) => {

        fetch(BASE_URL + "/contact_us", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonRequest),
        })
            .then(response => {
                log("url", response.url)
                log("Param", JSON.stringify(jsonRequest))
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network response error")
                }
            })
            .then(responseJson => {
                log("Response", JSON.stringify(responseJson))
                response(responseJson)
            })
            .catch(errorResponse => {
                log("error", JSON.stringify(errorResponse))
                error(errorResponse)
            });
    })
}

// const log = (tag, value) => {
//     // console.log(tag + " ==  " + value)

// }

module.exports = {

    requestRegister: register,
    requestSubmitOtp: verifyOTP,
    requestResendOtp: resendOTP,
    requestLogin: login,
    requestSubmitPin: submitPin, // Deprecated
    requestHome: home,
    requestProductDetail: productDetail,
    requestCategoriesList: categoriesList,
    requestSubCategories: subCategories,
    requestOffers: offers,
    requestTermsAndConditions: termsAndConditions,
    requestPrivacyPolicy: privacyPolicy,
    requestMyAccountDetails: myAccount,
    requestUserDetails: userDetails,
    requestUpdateUserDetails: updateUserDetails,
    requestMyOrders: myOrders,
    requestOrderDetails: orderDetails,
    requestProductsByCategory: productListByCategoryId, // Deprecated
    requestProductSearch: searchProducts, // Deprecated
    requestProductList: productList,
    requestFilterParams: filterParams,
    requestCart: cartListing,
    requestAddToCart: addToCart,
    requestUpdateCart: updateCart,
    requestRemoveFromCart: removeFromCart,
    requestClearCart: clearCart,
    requestAddToCartVariations: addToCartVariations,
    requestAddressList: addressList,
    requestStateList: stateList,
    requestAddAddress: addAddress,
    requestAddressDetails: getAddressDetail,
    requestEditAddress: editAddress,
    requestDeleteAddress: deleteAddress,
    requestGetCheckoutParams: getCheckoutParams,
    requestCheckout: checkout,
    requestUpdatePaymentResponse: updatePaymentResponse,
    requestNotifications: notifications,
    requestAreaList: getAreaList,
    requestApplyCoupon: applyCoupon,
    requestSettings: settings,
    requestRedeemPoints: readeemPoints,
    requestPrimeCheckoutDetails: getPrimeCheckoutDetails,
    requestPrimeCheckoutpaymentDetails: getPrimeCheckoutpaymentDetails,
    requestUpdatePrimePaymentResponse: updatePrimePaymentResponse,
    requestServicesList: getServicesList,
    requestPrimeTermsAndConditions: primeTermsAndConditions,
    requestAServices: requestAServices,
    requestOrderAndPaymentDetails: requestOrderAndPaymentDetails,
    requestReadeemPointsAtServiceCheckout: readeemPointsServiceCheckout,
    requestServiceCheckoutPaymentParams: requestServiceCheckoutPaymentParams,
    requestServicePaymentResponseUpdate: requestServicePaymentResponseUpdate,
    requestContactUs: contactUs,
    requestHomeNew: homeNew,
    requestHomeCopy: homeCopy
}