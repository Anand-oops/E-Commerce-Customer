import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import Collapsible from 'react-native-collapsible';
import Firebase from '../firebaseConfig';
import { AuthContext } from '../navigation/AuthProvider';
import { useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import Toast from 'react-native-simple-toast';

export default function SaleProductDetails(props) {

    const { user } = useContext(AuthContext);
    const product=props.route.params.product;
    const [check, setCheck] = useState(true);
    const [check2, setCheck2] = useState(true);
    const [collapsed, setCollapsed] = useState(true)
    const [item, setItem] = useState([])
    const [images, setImages] = useState([])
    const [wishlistItems,setWishlistItems]=useState([]);
    const [cartItems,setCart]=useState([]);
    
    Firebase.database().ref(`ProductList/${product.category}/${product.subCategory}/${product.productKey}`).once('value').then((data) => {
        if(check){
            if(data.val()){
                setItem(data.val())
                setImages(data.val().images)
                setCheck(false);
            }
        }
    })
    Firebase.database().ref(`Customers/${user.uid}`).on('value',(data)=>{
        if(check2){
        if(data.val()){

            if(data.val().wishlist){
           setWishlistItems(data.val().wishlist);
            }
            if(data.val().cart){
           setCart(data.val().cart);
            }
           setCheck2(false);
        }
    }

    })

    const addToWishlist = (item)=>{
        var list = [...wishlistItems]
        console.log("add to wishlist");
       
        var present=false;
       
        for(var i=0;i<list.length;i++){
            if(list[i].key==item.key){
                present=true;
                break;
            }
        }
     if(present){
        Toast.show("Already added !! ",Toast.SHORT);
     }else{
        list.push(item);
        setWishlistItems(list);
         console.log('items',wishlistItems);
         Firebase.database().ref(`Customers/${user.uid}/wishlist`).set(list).then(()=>{
             Toast.show("Added to WishList",Toast.SHORT);
         })
     }
         
    }

    const addToCart=(item)=>{
        console.log('add to cart ',item);
        var list=[...cartItems];

        var present=false;
       
        for(var i=0;i<list.length;i++){
            if(list[i].key==item.key){
                present=true;
                break;
            }
        }
     if(present){
        Toast.show("Already added !! ",Toast.SHORT);
     }else{
        list.push(item);
        setCart(list);
         Firebase.database().ref(`Customers/${user.uid}/cart`).set(list).then(()=>{
             Toast.show("Added to Cart",Toast.SHORT);
         })
     }
    }
    
    return (
        // <View style={styles.screen}>
        //     <ScrollView>
        //         <View style={styles.display}>
        //             <View style={styles.imageContainer}>
        //                 <SliderBox
        //                     images={images}
        //                     sliderBoxHeight={375}
        //                     circleLoop={true}
        //                     resizeMode={'contain'} />
        //                 {/* <TouchableOpacity style={styles.iconContainer} onPress={this.toggleFavorite}>
        //                         <Image source={this.state.clicked ? clicked : unclicked} style={styles.icon} />
        //                     </TouchableOpacity> */}
        //             </View>
        //             <Text style={styles.text}>{item.productName}</Text>
        //             <Text style={styles.price}>{item.salePrice}</Text>
        //         </View>
        //         <View style={styles.body}>
        //             <View style={styles.descriptionContainer}>
        //                 <Text style={styles.descriptionHeader}>Description:</Text>
        //                 <Text style={styles.description}>{item.description}</Text>
        //                 <TouchableOpacity onPress={() => setCollapsed(!collapsed)} >
        //                     <Text style={styles.productlink}>Product Specifications :</Text>
        //                 </TouchableOpacity>
        //                 <Collapsible collapsed={collapsed} >
        //                 <Text style={{fontSize:16, marginStart:20, marginBottom:5}}>{item.specs}</Text>
        //                 </Collapsible>
        //             </View>
        //             {/* <Modal
        //                     visible={this.state.showSpecsModal}
        //                     onRequestClose={this.closeModal}>
        //                     <Text style={styles.ratingText}>Product Specification</Text>
        //                     <View style={styles.modalContainer}>
        //                         {this.state.specs.map(specs => (
        //                             <View style={styles.container}>
        //                                 <Text style={styles.item}>{specs.key}</Text>
        //                                 <Text style={styles.item}>{specs.value}</Text>
        //                             </View>
        //                         ))}
        //                     </View>
        //                 </Modal> */}
        //             {/* <View style={styles.reviewContainer}>
        //                     <Modal
        //                         transparent
        //                         visible={this.state.showRateModal}
        //                         onRequestClose={this.closeModal}>
        //                         <View style={styles.modalContainer}>
        //                             <View style={styles.modalScreen}>
        //                                 <Text style={styles.ratingText}>Rate this Product: </Text>
        //                                 <View style={styles.textInputContainer}>
        //                                     <TextInput placeholder='Enter your review' multiline={true} style={styles.textInput} value={this.state.comment} onChangeText={this.commentHandler} />
        //                                 </View>
        //                                 <View style={styles.rating}>
        //                                     <StarRating
        //                                         disabled={false}
        //                                         maxStars={5}
        //                                         rating={this.state.rating}
        //                                         fullStarColor='#f1c40f'
        //                                         containerStyle={{ marginVertical: 10, }}
        //                                         selectedStar={(rating) => this.setState({ rating: rating })}
        //                                     />
        //                                     <TouchableOpacity onPress={this.commentsHandler}>
        //                                         <Text style={{ color: 'blue', fontSize: 16, marginVertical: 10, elevation: 1, borderWidth: 0.1, padding: 10 }}>Submit your Review</Text>
        //                                     </TouchableOpacity>
        //                                 </View>
        //                             </View>
        //                         </View>
        //                     </Modal>
        //                     <Text style={styles.ratingText}>Ratings & Reviews</Text>
        //                     <TouchableOpacity style={styles.rateProduct} onPress={() => { this.setState({ showRateModal: true }) }}>
        //                         <Text style={{ color: 'blue', fontSize: 16 }}>Rate Product</Text>
        //                     </TouchableOpacity>
        //                 </View> */}
        //             {/* <View style={styles.comments}>
        //                     {
        //                         this.state.comments.slice(0, 2).reverse().map(comment =>
        //                             <View style={styles.commentBox}>
        //                                 <View style={styles.userContainer}>
        //                                     <Image source={require('../assets/images/avatar.png')} style={styles.image} />
        //                                     <Text style={styles.user}>{comment.user}</Text>
        //                                 </View>
        //                                 <View style={styles.row}>
        //                                     <View style={styles.starCotainer}>
        //                                         <StarRating
        //                                             disabled={false}
        //                                             maxStars={5}
        //                                             rating={comment.rating}
        //                                             starSize={17}
        //                                             fullStarColor='#66aa66' />
        //                                     </View>
        //                                     <Text style={styles.dateText}>{comment.date}</Text>
        //                                 </View>
        //                                 <Text style={styles.commentText}>{comment.comment}</Text>
        //                             </View>
        //                         )}
        //                 </View> */}
        //             {/* <View style={styles.review}>
        //                     <TouchableOpacity onPress={() => {
        //                         this.setState({
        //                             showModal: true,
        //                         })
        //                     }}>
        //                         <Text style={styles.link}>See all Ratings and Reviews </Text>
        //                     </TouchableOpacity>
        //                 </View> */}
        //         </View>
        //     </ScrollView>
        //     <View>
        //         <TouchableOpacity style={styles.saveButton} /*onPress={this.saveToCart}*/>
        //             <Text style={{ fontSize: 18, color: 'white' }}>ADD TO CART</Text>
        //         </TouchableOpacity>
        //     </View>
        //     {/* <Modal
        //             visible={this.state.showModal}
        //             onRequestClose={this.closeModal}>
        //             <View style={styles.screen}>
        //                 <ScrollView style={styles.comments}>
        //                     {
        //                         this.state.comments.map(comment =>
        //                             <View style={styles.commentBox}>
        //                                 <View style={styles.userContainer}>
        //                                     <Image source={require('../assets/images/avatar.png')} style={styles.image} />
        //                                     <Text style={styles.user}>{comment.user}</Text>
        //                                 </View>
        //                                 <View style={styles.row}>
        //                                     <View style={styles.starCotainer}>
        //                                         <StarRating
        //                                             disabled={false}
        //                                             maxStars={5}
        //                                             rating={3}
        //                                             starSize={17}
        //                                             fullStarColor='#66aa66' />
        //                                     </View>
        //                                     <Text style={styles.dateText}>{comment.date}</Text>
        //                                 </View>
        //                                 <Text style={styles.commentText}>{comment.comment}</Text>
        //                             </View>
        //                         )}
        //                 </ScrollView>
        //             </View>
        //         </Modal> */}
        // </View>

        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.display}>
                    <View style={styles.imageContainer}>
                        <SliderBox
                            images={images}
                            sliderBoxHeight={375}
                            circleLoop={true}
                            resizeMode={'stretch'} />
                        {/* <TouchableOpacity style={styles.iconContainer} onPress={this.toggleFavorite}>
                                <Image source={this.state.clicked ? clicked : unclicked} style={styles.icon} />
                            </TouchableOpacity> */}
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                    <Text style={{textTransform:'uppercase',fontSize:18,fontWeight:'bold',paddingBottom:4}}>{item.productName}</Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#2f4f4f',fontSize:15,marginRight:6,fontWeight:'bold'}}>{"₹"+item.salePrice}</Text>
                    <Text style={{color:'grey',fontSize:15,marginRight:6 ,textDecorationLine:'line-through'}}>{"₹"+item.productPrice}</Text>
                    <Text style={{color:'#ff4500',fontSize:15,marginRight:6}}>{"("+ item.saleDiscount+" OFF)"}</Text>
                    </View>
                    <Text style={{fontSize:12,color:'green',fontWeight:'bold'}}>{"inclusive of all taxes"}</Text>
                    </View>
                    <View style={{ paddingTop:10}}>
                    <TouchableOpacity>
                    <AntDesign name="hearto" size={28} color="grey" />
                    </TouchableOpacity>
                    </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.descriptionContainer}>
                        <Text style={{marginLeft:7,fontSize:18,color:'#2f4f4f',fontWeight:'bold'}}>Product Details:</Text>
                        <Text style={{marginLeft:7,color:"grey",marginBottom:5}}>{item.description}</Text>
                        <TouchableOpacity onPress={() => setCollapsed(!collapsed)} >
                            <Text style={{fontSize:18,marginLeft:7,color:'#2f4f4f',fontWeight:'bold'}}>Product Specifications:</Text>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsed} >
                            <Text style={{ fontSize: 16, marginLeft:7, marginBottom:5,color:'grey' }}>{item.specs}</Text>
                        </Collapsible>
                        <View style={{flexDirection:'row',margin:5}}> 
                        <TouchableOpacity style={{flex:1,margin:5,flexDirection:'row',padding: 10,elevation: 10,borderRadius:4,backgroundColor: 'white',alignItems: 'center',}}
                         onPress={()=>{addToWishlist(item)}}>
                        <AntDesign name="hearto" size={20} color="grey" />
                    <Text style={{ fontSize: 15,fontWeight:'bold', color: 'black',marginLeft:10 }}>WISHLIST</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,padding: 10,flexDirection:'row',margin:5,elevation: 10,borderRadius:4,backgroundColor: '#dc143c',alignItems: 'center',borderColor:'gray'}} 
                         onPress={()=>{addToCart(item)}}>
                    <FontAwesome name="shopping-bag" size={20} color="white" />
                    <Text style={{ fontSize: 15, color: 'white',fontStyle:'italic',marginLeft:10 }}>ADD TO CART</Text>
                </TouchableOpacity>
            </View>
                    </View>
                    {/* <Modal
                            visible={this.state.showSpecsModal}
                            onRequestClose={this.closeModal}>
                            <Text style={styles.ratingText}>Product Specification</Text>
                            <View style={styles.modalContainer}>
                                {this.state.specs.map(specs => (
                                    <View style={styles.container}>
                                        <Text style={styles.item}>{specs.key}</Text>
                                        <Text style={styles.item}>{specs.value}</Text>
                                    </View>
                                ))}
                            </View>
                        </Modal> */}
                    {/* <View style={styles.reviewContainer}>
                            <Modal
                                transparent
                                visible={this.state.showRateModal}
                                onRequestClose={this.closeModal}>
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalScreen}>
                                        <Text style={styles.ratingText}>Rate this Product: </Text>
                                        <View style={styles.textInputContainer}>
                                            <TextInput placeholder='Enter your review' multiline={true} style={styles.textInput} value={this.state.comment} onChangeText={this.commentHandler} />
                                        </View>
                                        <View style={styles.rating}>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                rating={this.state.rating}
                                                fullStarColor='#f1c40f'
                                                containerStyle={{ marginVertical: 10, }}
                                                selectedStar={(rating) => this.setState({ rating: rating })}
                                            />
                                            <TouchableOpacity onPress={this.commentsHandler}>
                                                <Text style={{ color: 'blue', fontSize: 16, marginVertical: 10, elevation: 1, borderWidth: 0.1, padding: 10 }}>Submit your Review</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <Text style={styles.ratingText}>Ratings & Reviews</Text>
                            <TouchableOpacity style={styles.rateProduct} onPress={() => { this.setState({ showRateModal: true }) }}>
                                <Text style={{ color: 'blue', fontSize: 16 }}>Rate Product</Text>
                            </TouchableOpacity>
                        </View> */}
                    {/* <View style={styles.comments}>
                            {
                                this.state.comments.slice(0, 2).reverse().map(comment =>
                                    <View style={styles.commentBox}>
                                        <View style={styles.userContainer}>
                                            <Image source={require('../assets/images/avatar.png')} style={styles.image} />
                                            <Text style={styles.user}>{comment.user}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.starCotainer}>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={comment.rating}
                                                    starSize={17}
                                                    fullStarColor='#66aa66' />
                                            </View>
                                            <Text style={styles.dateText}>{comment.date}</Text>
                                        </View>
                                        <Text style={styles.commentText}>{comment.comment}</Text>
                                    </View>
                                )}
                        </View> */}
                    {/* <View style={styles.review}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    showModal: true,
                                })
                            }}>
                                <Text style={styles.link}>See all Ratings and Reviews </Text>
                            </TouchableOpacity>
                        </View> */}
                </View>
            </ScrollView>
            
            {/* <Modal
                    visible={this.state.showModal}
                    onRequestClose={this.closeModal}>
                    <View style={styles.screen}>
                        <ScrollView style={styles.comments}>
                            {
                                this.state.comments.map(comment =>
                                    <View style={styles.commentBox}>
                                        <View style={styles.userContainer}>
                                            <Image source={require('../assets/images/avatar.png')} style={styles.image} />
                                            <Text style={styles.user}>{comment.user}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.starCotainer}>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={3}
                                                    starSize={17}
                                                    fullStarColor='#66aa66' />
                                            </View>
                                            <Text style={styles.dateText}>{comment.date}</Text>
                                        </View>
                                        <Text style={styles.commentText}>{comment.comment}</Text>
                                    </View>
                                )}
                        </ScrollView>
                    </View>
                </Modal> */}
        </View>
        
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    display: {
        borderBottomWidth: 10,
        borderBottomColor: '#D0D0D0',
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 20,
    },

    descriptionContainer: {
        borderBottomWidth: 10,
        borderBottomColor: '#D0D0D0',
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        elevation: 5,
        height: 375,
    },

    productlink: {
        color: 'blue',
        paddingLeft: 20,
        fontSize: 18,
        marginVertical: 10
    },

    mainImage: {
        flex: 1,
        resizeMode: 'contain',
        width: 300,
        height: 450,
    },

    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 0,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 100,
        borderWidth: 0.2,
        elevation: 1,
    },

    icon: {
        height: 30,
        width: 30,
    },

    strike: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontSize: 16,
        marginVertical: 5,
    },

    price: {
        color: 'red',
        fontSize: 24,
    },

    body: {
        flex: 1,
    },

    descriptionHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
    },

    description: {
        fontStyle: 'italic',
        fontSize: 18,
        marginVertical: 10,
        marginLeft: 30,
    },

    reviewContainer: {
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
    },

    modalContainer: {
        flex: 1,

        alignItems: 'center',
    },

    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    modalScreen: {
        height: 300,
        width: '90%',
        elevation: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    rating: {
        width: '70%',
        marginBottom: 10,
        alignItems: 'center',
    },

    ratingText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },

    rateProduct: {
        padding: 10,
        elevation: 2,
        borderWidth: 0.1,
    },

    review: {
        padding: 20,
        backgroundColor: '#FAFAFA'
    },

    link: {
        marginVertical: 20,
        color: 'blue',
        fontSize: 16,
    },

    text: {
        fontSize: 20,
    },

    comments: {
        paddingHorizontal: 10,
        padding: 10,
    },

    commentBox: {
        elevation: 1,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    },

    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    row: {
        flexDirection: 'row',
    },

    image: {
        height: 40,
        width: 40,
    },

    user: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },

    starCotainer: {
        width: '20%',
        marginVertical: 10,
    },

    dateText: {
        marginLeft: 20,
        marginVertical: 10,
    },

    commentText: {
        marginVertical: 5,
        fontSize: 16,
    },

    textInputContainer: {
        marginVertical: 20,
        width: '100%',
    },

    textInput: {
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        elevation: 1,
        borderColor: 'black',
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 8,
        fontSize: 16,
    },
    saveButton: {
        padding: 15,
        elevation: 10,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: 'black',
        alignItems: 'center',
    },
});