import { StyleSheet } from 'react-native'
import Colors from './Colors'

const MStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    mainGray: {
        flex: 1,
        backgroundColor: Colors.dividerColor,
    },
    mainAuth: {
        flex: 1,
        backgroundColor: Colors.primaryDark,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtTitle: {
        fontSize: 22,
        fontFamily: 'OpenSans-Regular'
    },
    txtToolbarTitle: {
        fontSize: 18,
        fontFamily: 'OpenSans-Bold'
    },
    txtTitleSmall: {
        fontSize: 20,
        fontFamily: 'OpenSans-Regular'
    },
    txtSubTitle: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold'
    },
    txtDrawerMenu: {
        fontSize: 12,
        fontFamily: 'OpenSans-Bold'
    },
    txtSubTitleSemiBold: {
        fontSize: 16,
        fontFamily: 'OpenSans-Regular'
    },
    txtDescription: {
        fontSize: 14,
        fontFamily: 'OpenSans-Regular'
    },
    txtDescriptionBold: {
        fontSize: 14,
        fontFamily: 'OpenSans-Bold'
    },
    productTitle: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16
    },
    productQuntity: {
        fontSize: 14,
        color: Colors.textGray,
        fontFamily: 'OpenSans-Regular'
    },
    discountText: {
        backgroundColor: Colors.primaryDarkButton,
        alignSelf: 'baseline',
        borderRadius: 4,
        fontFamily: 'OpenSans-Regular',
        marginHorizontal: 5,
        paddingHorizontal: 5,
        paddingVertical: 3,
        color: Colors.white,
        fontSize: 12
    },
    categoryNameHome: {
        fontSize: 12,
        color: Colors.black,
        fontFamily: 'OpenSans-Regular'
    },
    horizontal: {
        flexDirection: 'row',
    },
    textInput: {
        color: Colors.black,
        fontSize: 18,
        borderColor: Colors.dividerColor,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        width: '100%',
        padding: 5,
        height: 40,
        marginTop: 5,
        fontFamily: 'OpenSans-Regular'
    },
    txtDiscount: {
        fontSize: 12,
        color: Colors.white,
        fontFamily: 'OpenSans-Regular'
    },
    textInputOTP: {
        textAlign: 'center',
        color: Colors.black,
        fontSize: 18,
        minHeight: 45,
        borderColor: '#ededed',
        borderWidth: 1,
        borderRadius: 4,
        paddingTop: 8,
        padding: 5,
        marginTop: 5,
        flex: 1,
        marginHorizontal: 8,
        maxWidth: 50,
        fontFamily: 'OpenSans-Regular'
    },
    cardView: {
        borderRadius: 3,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonParent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: Colors.primaryDark,
        shadowColor: Colors.black,
        overflow: "visible",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    themeButton: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 16,
        width: '100%',
        padding: 15,
        fontFamily: 'OpenSans-Regular'
    },
    buttonSmallParent: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 3,
        // backgroundColor: Colors.assent,
        backgroundColor: Colors.primary,
        shadowColor: Colors.black,
        overflow: "visible",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    whiteButtonSmallParent: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 3,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        overflow: "visible",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },

    themeButtonSmall: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 14,
        width: '100%',
        paddingVertical: 4,
        fontFamily: 'OpenSans-Regular'
    },
    authHeader: {
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    authFooter: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    authTabParent: {
        flexDirection: 'row',
        backgroundColor: Colors.primaryDark,
        justifyContent: 'flex-end',
        padding: 10
    },
    authTab: {
        flexDirection: 'row',
        borderColor: Colors.white,
        marginStart: 5,
        padding: 10,
        alignItems: 'center'

    },
    authTabSeleted: {
        flexDirection: 'row',
        borderBottomColor: Colors.white,
        marginStart: 5,
        padding: 10,
        borderBottomWidth: 2,
        alignItems: 'center'
    },
    homeSearch: {
        flexDirection: 'row',
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.primaryDark,
        justifyContent: 'center',
        alignItems: 'center'
    },
    homeSearchInput: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 5,
        paddingVertical: 7,
        paddingHorizontal: 10
    },
    homeSearchIconRoot: {
        width: '100%',
        paddingEnd: 15,
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    categoryTag: {
        backgroundColor: Colors.primaryDark,
        color: Colors.white,
        alignSelf: 'baseline',
        fontFamily: 'OpenSans-Regular'
    },
    ratingBack: {
        backgroundColor: Colors.ratingBack,
        alignSelf: 'baseline'
    },
    categoryTagRound: {
        backgroundColor: Colors.primaryDark,
        color: Colors.white,
        alignSelf: 'baseline',
        borderRadius: 4,
        fontFamily: 'OpenSans-Regular'
    },
    divider: {
        backgroundColor: Colors.dividerColor,
        height: 1,
        width: '100%'
    },
    dividerDrawer: {
        backgroundColor: Colors.dividerColorLight,
        height: 1,
        width: '100%'
    },
    completed: {
        backgroundColor: Colors.completed,
        borderRadius: 3,
        alignSelf: 'baseline',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5
    },
    processing: {
        backgroundColor: Colors.processing,
        borderRadius: 3,
        alignSelf: 'baseline',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5
    },
    pending: {
        backgroundColor: Colors.pending,
        borderRadius: 3,
        alignSelf: 'baseline',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5
    },
    cancelled: {
        backgroundColor: Colors.cancelled,
        borderRadius: 3,
        alignSelf: 'baseline',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5
    },
    circle: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        backgroundColor: Colors.discount
    },
    filterTab: {
        borderBottomColor: Colors.dividerColor,
        borderBottomWidth: 2,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        flex: .5
    },
    filterTabSelected: {
        borderBottomColor: Colors.black,
        borderBottomWidth: 2,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        flex: .5
    },
    buttonAdd: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        paddingHorizontal: 3,
        borderRadius: 4,
        borderColor: Colors.primaryDarkButton,
        backgroundColor: Colors.primaryDarkButton,
        borderWidth: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    textCount: {
        fontFamily: 'OpenSans-Regular',
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: 10
    }
})

export default MStyles