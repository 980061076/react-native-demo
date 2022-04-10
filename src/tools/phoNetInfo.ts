import DeviceInfo  from 'react-native-device-info'
/**
 * @uses 获取手机内存使用情况
 */
export const getMemoryInfo =async ()=>{

    let phoneNumber = await DeviceInfo.getDeviceName()

    let [TotalDisk,usedMemory,totalMemory] = await Promise.all([
        //获取这总磁盘大小
        DeviceInfo.getTotalDiskCapacity(),
        //获取可以磁盘大小
        DeviceInfo.getFreeDiskStorage(),
        //获取总内存
        DeviceInfo.getTotalMemory()
    ]) 

    console.log(
        TotalDisk/(1024*1024*1024),
        usedMemory/(1024*1024*1024),':G',
        totalMemory/(1024*1024*1024),':G'
    )

    console.log(phoneNumber,'phoneNumber')
}