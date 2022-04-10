/**列表项 */
export type DataItem = {
    id:number
    /**标题 */
    full_name:string
    /**描述 */
    description:string
    /**star数量 */
    stargazers_count:number
    /**创建时间 */
    created_at:string
    /**更新时间 */
    updated_at:string
    /**用户信息 */
    owner:{
        /**头像 */
        avatar_url:string,
    }
}