import { FlatList, Image, SafeAreaView, StyleSheet, Alert, Modal, Text, TouchableOpacity, View, Button, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addMotorAPI, deleteMotorApi, fetchMotors, updateMotorApi } from '../redux/actions/motorActions';
import Banner from '../components/banner';
import * as ImagePicker from 'react-native-image-picker';
import { sortListMotor } from '../redux/reducers/motorReducers';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSpring,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const listMotor = useSelector(state => state.listMotor.listMotor);
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    
    const [describe, setDescribe] = useState('')
    const [color, setColor] = useState('')
    const [image, setImage] = useState(null)
    const initialOffset = 10;
    const [isUpdate, setUpdate] = useState(false)
    const [search, setSearch] = useState([])
    const [id, setId] = useState('')
    const opacity = useSharedValue(0);

    const offset = useSharedValue(initialOffset);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 5000 });
        offset.value = withRepeat(withSpring(-offset.value),-1,true);
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    useEffect(() => {
        dispatch(fetchMotors());
    }, [dispatch]);

    const list = useMemo(() => {
        return listMotor
    })

    const chooseImage = useCallback(() => {
        let options = {
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (!response.didCancel) {
                setImage(response.assets[0].uri);
            }
        });
    }, []);

    const handleDeleteMotor = async (id) => {
        dispatch(deleteMotorApi(id))
            .then((result) => {
                ToastAndroid.show("Xóa xe máy thành công", ToastAndroid.SHORT);
            })
            .catch((error) => {
                ToastAndroid.show("Xóa xe máy thành công", ToastAndroid.SHORT);
            });
    }
    const sortList = (number) => {
        dispatch(sortListMotor({ numberSort: number }))
    }

    const handleAddData = () => {
        if (name == "" || price == "" || describe == "" || color == "" || image == null) {
            ToastAndroid.show("Vui lòng nhập thông tin xe", ToastAndroid.SHORT)
            return
        }
        if (parseFloat(price) < 0) {
            ToastAndroid.show("Giá không được nhỏ hơn không ?", ToastAndroid.SHORT)
            return
        }
        let data = {
            name_ph32353: name,
            price_ph32353: price,
            describe_ph32353: describe,
            color_ph32353: color,
            image_ph32353: image
        }
        isUpdate ? dispatch(updateMotorApi({ id: id, data: data })).then(() => {
            ToastAndroid.show("Sửa thành công", ToastAndroid.SHORT);
            setModalVisible(false)
        }).catch((error) => {
            ToastAndroid.show("Sửa thất bại", ToastAndroid.SHORT);
            console.log(error)
        }) : dispatch(addMotorAPI(data)).then(() => {
            ToastAndroid.show("Thêm xe thành công", ToastAndroid.SHORT);
            setModalVisible(false)
        }).catch((error) => {
            ToastAndroid.show("Thêm xe thất bại", ToastAndroid.SHORT);
            console.log(error)
        })
    }
    const filteredMotor = search ? list.filter(motor => motor.name_ph32353.includes(search)) : list;
    return (
        <SafeAreaView style={{ width: '100%', backgroundColor: '#30336b', height: '100%', padding: 10 }}>
            <Banner uri={"https://phunugioi.com/wp-content/uploads/2021/07/Hinh-anh-xe-Dream-dep-nhat.jpg"} />
            <View style={{ width: '100%', height: 'auto', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between' }}>
                <Animated.Text
                    style={[
                        { fontWeight: 'bold', fontSize: 25, color: 'white', marginBottom: 10 },
                        animatedStyle,
                    ]}>
                    Danh sách xe máy
                </Animated.Text>
                <View style={{ flexDirection: 'row', width: '30%', justifyContent: 'space-between' }}>
                    <Button onPress={() => sortList(1)} title='Tăng' />
                    <Button onPress={() => sortList(2)} title='Giảm' />
                </View>
            </View>
            <TextInput
                onChangeText={(text) => {
                    setSearch(text)
                }}
                placeholder='Search'
                style={{ width: '100%', padding: 10, marginBottom: 10, backgroundColor: 'white', height: 45, borderWidth: 1, borderRadius: 15 }}>
            </TextInput>
            <FlatList
                data={filteredMotor}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <View style={{ width: '100%', padding: 5, backgroundColor: 'white', flexDirection: 'row', height: 130, borderWidth: 1, borderColor: 'white', borderRadius: 15, marginBottom: 10 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Image
                                resizeMethod='resize'
                                resizeMode='cover'
                                style={{ width: '90%', height: '90%', borderRadius: 10 }}
                                source={{
                                    uri: item.image_ph32353
                                }}
                            />
                        </View>
                        <View style={{ flex: 2, marginLeft: 5, justifyContent: 'space-evenly' }}>
                            <Text style={{ fontSize: 15, fontWeight: 500, color: 'black' }}>
                                Hãng : {item.name_ph32353}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 500 }}>
                                Giá : {item.price_ph32353}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 500 }}>
                                Mô tả : {item.describe_ph32353}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 500 }}>
                                Màu sắc : {item.color_ph32353}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xóa xe này không ?', [
                                            {
                                                text: 'Cancel',
                                                onPress: () => console.log('Cancel Pressed'),
                                                style: 'cancel',
                                            },
                                            { text: 'OK', onPress: () => handleDeleteMotor(item.id) },
                                        ]);
                                    }
                                }
                            >
                                <Text style={{ marginRight: 5, color: '#eb4d4b' }}>
                                    Xóa
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(true)
                                setColor(item.color_ph32353)
                                setImage(item.image_ph32353)
                                setDescribe(item.describe_ph32353)
                                setPrice(item.price_ph32353 + "")
                                setId(item.id)
                                setName(item.name_ph32353)
                                setUpdate(true)
                            }}>
                                <Text style={{ color: '#22a6b3' }}>
                                    Sửa
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }}
            />
            <AnimatedTouchableOpacity
                    onPress={
                        () => {
                            setUpdate(false)
                            setId("")
                            setColor("")
                            setImage(null)
                            setDescribe("")
                            setName("")
                            setPrice("")
                            setModalVisible(true)
                        }
                    }
                    style={[
                        {
                            position: 'absolute',
                            end: 40,
                            bottom: 40,
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: 'orange',
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        animatedStyles
                    ]}
                >
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>+</Text>
                </AnimatedTouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 330, height: 400, justifyContent: 'space-evenly', alignItems: 'center', padding: 10, backgroundColor: 'white', borderRadius: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                            {isUpdate ? "Sửa thông tin" : "Thêm xe máy"}
                        </Text>

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={
                                    {
                                        uri: image == null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaU9m9lbkYGRUHOSBvH0jMxXJEOO6xsOHHBhNocTxuKA&s" : image
                                    }
                                }>
                            </Image>
                            <View>
                                <Button onPress={chooseImage} title='Chọn hình ảnh' />
                            </View>
                        </View>
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder='Tên'
                            style={{ width: '90%', height: 40, borderWidth: 1, borderRadius: 10 }} />
                        <TextInput
                            value={price}
                            onChangeText={(text) => setPrice(text)}
                            placeholder='Giá'
                            style={{ width: '90%', height: 40, borderWidth: 1, borderRadius: 10 }} />
                        <TextInput
                            value={describe}
                            onChangeText={(text) => setDescribe(text)}
                            placeholder='Mô tả'
                            style={{ width: '90%', height: 40, borderWidth: 1, borderRadius: 10 }} />
                        <TextInput
                            value={color}
                            onChangeText={(text) => setColor(text)}
                            placeholder='Màu sắc'
                            style={{ width: '90%', height: 40, borderWidth: 1, borderRadius: 10 }} />
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                            <Button onPress={
                                () => {
                                    setModalVisible(false)
                                }
                            } title='Hủy' />
                            <Button onPress={handleAddData} title={isUpdate ? "Sửa" : "Thêm"} />
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})