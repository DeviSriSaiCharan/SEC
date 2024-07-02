import zod from "zod";

const UserSchema=zod.object({
       email:zod.string().email(),
       fullName:zod.string(),
       password:zod.string().min(8),
       username:zod.string().min(3)
})

export const useZODuser=(inpOBJ)=>{
   
    const response=UserSchema.safeParse(inpOBJ);
    
    return response;
}