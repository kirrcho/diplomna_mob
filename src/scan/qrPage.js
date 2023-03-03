import 'react-native-reanimated';
import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';

import { useNavigation } from '@react-navigation/native';

import { sendMessageAsync } from '../messaging/messageClient';

import { getData } from '../storage/localStorageFuncs.js'

export function ScanScreen() {
    const [hasPermission, setHasPermission] = React.useState(false);
    const [messageSendingInProgress, setMessageSendingInProgress] = React.useState(false);
    const devices = useCameraDevices();
    const device = devices.back;

    const navigation = useNavigation();

    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
        checkInverted: true,
    });

    React.useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    const sendBarcodeMsg = async () => {
        var token = await getData('token');
        sendMessageAsync('barcode', {"scanInfo": barcodes[0].displayValue, "token": token});
        navigation.navigate("ScanSuccessScreen");
    }

    if(barcodes[0] && !messageSendingInProgress) {
        setMessageSendingInProgress(true);
        sendBarcodeMsg();
    }

    return (
        device != null &&
        hasPermission && (
            <>
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    frameProcessor={frameProcessor}
                    frameProcessorFps={1}
                />
            </>
        )
    );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  camStyles: {
    height:200,
    width:50,
    fontSize:20,
    minHeight:200,
    backgroundColor: 'white'
  }
});