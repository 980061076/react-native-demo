import React, { useEffect, useState } from 'react';
import { Button, Platform, SafeAreaView, StyleSheet, Text, Vibration, View } from 'react-native';
import { Paragraph, Dialog, Portal, Provider } from 'react-native-paper';


const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS
];

const PATTERN_DESC =
Platform.OS === "android"
  ? "wait 1s, vibrate 2s, wait 3s"
  : "wait 1s, vibrate, wait 2s, vibrate, wait 3s";


const Separator = () => {
    return <View style={Platform.OS === "android" ? styles.separator : null} />;
  }
const MyComponent = () => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
 
  useEffect(()=>{
      console.log(visible,'visible发生了变化')
  },[visible])
  return (
    <Provider>
      <View         
      style={{
            width:'50%',
            marginTop:20,
            marginHorizontal:10
        }}>
        <Button 
        title='Show Dialog'
        onPress={()=>{
            Vibration.vibrate(50)
            showDialog()
        }} 
        ></Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
      <SafeAreaView style={styles.container}>
      <Text style={[styles.header, styles.paragraph]}>Vibration API</Text>
      <View>
        <Button title="Vibrate once" onPress={() => Vibration.vibrate()} />
      </View>
      <Separator />
      {Platform.OS == "android"
        ? [
            <View>
              <Button
                title="Vibrate for 10 seconds"
                onPress={() => Vibration.vibrate(10 * ONE_SECOND_IN_MS)}
              />
            </View>,
            <Separator />
          ]
        : null}
      <Text style={styles.paragraph}>Pattern: {PATTERN_DESC}</Text>
      <Button
        title="Vibrate with pattern"
        onPress={() => Vibration.vibrate(PATTERN)}
      />
      <Separator />
      <Button
        title="Vibrate with pattern until cancelled"
        onPress={() => Vibration.vibrate(PATTERN, true)}
      />
      <Separator />
      <Button
        title="Stop vibration pattern"
        onPress={() => Vibration.cancel()}
        color="#FF0000"
      />
    </SafeAreaView>
    </Provider>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingTop: 44,
      padding: 8
    },
    header: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center"
    },
    paragraph: {
      margin: 24,
      textAlign: "center"
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: "#737373",
      borderBottomWidth: StyleSheet.hairlineWidth
    }
  });
export default MyComponent;