//import : react components
import React, {useEffect, useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
//import : custom components
import MyText from 'components/MyText/MyText';
import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : global
import {Colors} from 'global/Index';
//import : styles
import {styles} from './TrainingVideosStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {Service} from '../../../global/Index';
import {width} from '../../../global/Constant';

const TrainingVideos = ({navigation, dispatch}) => {
  const userToken = useSelector(state => state.user.userToken);
  const [showLoader, setShowLoader] = useState(false);
  const [videoData, setVideoData] = useState([]);

  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    getVideos();
  }, []);
  const getVideos = async () => {
    const tempToken = `20|styw8BWZn5bvwMI7lDtJGd7EuZAVD3ap2tDhDddO`;
    setShowLoader(true);
    try {
      const resp = await Service.getApiWithToken(userToken, Service.VIDEOS);
      console.log('setVideoData resp', resp?.data);
      if (resp?.data?.status) {
        setVideoData(resp?.data?.allvideos);
      } else {
        Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in setVideoData', error);
    }
    setShowLoader(false);
  };

  //UI
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '20%'}}>
        <Image
          source={require('assets/images/rent-your-points-bg.png')}
          style={styles.homebg}
        />
        <Image
          source={require('assets/images/splash-logo.png')}
          style={styles.screenLogo}
        />

        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
          style={styles.backView}>
          <Image source={require('assets/images/dark-back-icon.png')} />
        </TouchableOpacity>

        <View style={styles.mainView}>
          <MyText
            text="How To Videos"
            textColor={Colors.THEME_BLUE}
            fontSize={21}
            fontFamily="bold"
            style={{textAlign: 'center'}}
          />
          {videoData?.length > 0 ? (
            videoData?.map(el => {
              console.log('videoData el', el);
              return (
                <View style={{marginBottom: 20}}>
                  <MyText
                    text={el?.title}
                    textColor={Colors.THEME_GRAY}
                    fontSize={17}
                    fontFamily="medium"
                    style={{marginTop: 15, marginBottom: 10}}
                  />

                  <View style={styles.webViewContainer}>
                    <WebView
                      source={{
                        uri: el?.url_link,
                      }}
                      contentMode="mobile"
                      style={styles.webViewStyle}
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <View style={{marginTop:30}} >
              <Image source={require('assets/images/no-data.png')} />
              <MyText
                text="No Videos found"
                textColor={Colors.THEME_GRAY}
                fontSize={16}
                fontFamily="medium"
                textAlign="center"
                style={{marginTop: 10}}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(TrainingVideos);
