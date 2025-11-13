import { useState, type FormEvent } from "react"

interface SignUpFormData{
    name:string,
    email:string,
    password:string
}

const SignUpForm = ()=>{

    const [formData, setFormData]= useState<SignUpFormData>({
        name:"",
        email:"",
        password:""
    });
    const [error,setError]=useState("");
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
            const {name, value}=e.target;
            setFormData((prev)=>({...prev,[name]:value}));
    }
    const handleSubmit = (e:FormEvent)=>{
        e.preventDefault();

        if(!formData.name||!formData.email||!formData.password){
            console.log("please provide value in all the fields of the form");
            setError("please enter value in all the fields");
            return;
        }
        setError("");
        alert("form submitted successfulLY !!");
        console.log("FORM DATA  :", formData);
    }

    return(
        <div style={{width:"400px"}}>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection:"column", gap:"10 px "}}>
                <h1>Sign Up </h1>
                <p style={{color:"red" , fontSize:"small"}}>{error}</p>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}/>
                <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
        <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;