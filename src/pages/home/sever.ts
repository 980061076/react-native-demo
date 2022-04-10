
let url = `https://api.github.com/search/repositories?q=`;

/**
 * @uses 获取列表数据
 * 
 */
 export const getListData = async (value:string)=>{

    return fetch(url+value).then(data=>{
        console.log(data,'data')
        if (data.ok) {
            return data.json();
        }
        throw new Error('Network response was not ok.');
    })

}