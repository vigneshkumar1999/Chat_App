
const LeaveFunc=(userId,users)=>{
    return users.filter((user)=>user.id!==userId)
}

module.exports=LeaveFunc;