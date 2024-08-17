import axios, { toFormData } from 'axios';
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    let [allUser,setallUser]=useState([])
  let [formData,setFormData]=useState({
    name:"",
    email:"",
    contact:"",
    password:"",
    id:""
  })

  

  let getInputValue=(event)=>{
   
    let oldData={...formData}
    let inputName=event.target.name
    let valueName=event.target.value
    oldData[inputName]=valueName
    setFormData(oldData)
  }
  
  let saveUser=(event)=>{
    event.preventDefault()
     console.log(formData);
     axios.post(`https://wscubetech.co/form-api/save_user.php`, toFormData(formData) )
     .then((res)=>{
         console.log(res.data)
         if(formData.id===""){
             toast.success("Data Saved")
         }
         else{
            toast.success("Data Updated")
         }
      setFormData({
          name:"",
          email:"",
          contact:"",
          password:"",
          id:""
        })
        getUser()
    })
  }

  let deleteRow=(idNumber)=>{
    // alert(idNumber)
    axios.get(`https://wscubetech.co/form-api/delete_user.php?id=${idNumber}`)
    .then((res)=>{
        res.data
        toast.error("Data Deleted")
        getUser()
  })
  }


  let editRow=(id)=>{
    axios.get(`https://wscubetech.co/form-api/view_user.php?id=${id}`)
    .then((res)=>{
        return res.data
    })
    .then((finalData)=>{
        let fData=finalData.dataList
        console.log(fData);
        setFormData({
            name: fData.en_name,
            email: fData.en_email,
            contact: fData.en_contact,
            password: fData.en_password,
            id: fData.en_id
          })
        // ! We have to work on btn and something watch video
            
        }) 
  }
  let getUser=()=>{
    axios.get("https://wscubetech.co/form-api/view_user.php")
    .then((res)=>{
        setallUser(res.data.dataList);
        
    })
  }

  useEffect(()=>{
      getUser()
  },[])
  return (
    <>
      <section className="bg-[#212121] w-full h-screen">
    <div className="max-w-[1450px] mx-auto pt-12 bg-[#212121] h-full">
      <div className="grid grid-cols-[30%_auto] gap-8">
      
      <div className="p-6 h-[540px] bg-[#1F2937] shadow-whiteShadow rounded-2xl space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Registeration Form
              </h1>
              <form onSubmit={saveUser} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                      <input type="text" name="name" value={formData.name} onChange={getInputValue} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" required/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" value={formData.email} onChange={getInputValue} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required/>
                  </div>
                  <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                      <input type="tel" name="contact" value={formData.contact} onChange={getInputValue} id="phone" placeholder="Enter your phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" value={formData.password} onChange={getInputValue} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  
                  <button type="submit"  className="w-full border-2 bg-blue-800 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{formData.id==="" ? "Save" : "Update"
                    }</button>
                  
              </form>
          </div>

          <div className="relative overflow-x-auto sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <ToastContainer/>
            <tr>
                <th scope="col" className="px-6 py-3">
                    Sr. No.
                </th>
                <th scope="col" className="px-6 py-3">
                    user name
                </th>
                <th scope="col" className="px-6 py-3">
                    email
                </th>
                <th scope="col" className="px-6 py-3">
                    phone
                </th>
                <th scope="col" className="px-6 py-3">
                    password
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            { allUser.length>=1 ? 
            allUser.map((item,index)=>{
                return  <tr key={item.en_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {index+1}
                </th>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {item.en_name}
                </td>
                <td className="px-6 py-4">
                    {item.en_email}
                </td>
                <td className="px-6 py-4">
                   {item.en_contact}
                </td>
                <td className="px-6 py-4">
                    {item.en_password}
                </td>
                <td className="px-6 py-4 text-left">
                    <button onClick={()=>deleteRow(item.en_id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                </td>
                <td className="px-6 py-4 text-left">
                    <button onClick={()=>editRow(item.en_id)} className="font-medium text-blue-600 dark:text-blue-600 hover:underline">Edit</button>
                </td>
            </tr>  
            }) 
            :
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" colSpan={7} className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                 No Data Found....
            </th>
        </tr>   
        }
        
        </tbody>
    </table>
</div>
      </div>
    </div>
    </section>
    </>
  )
}

export default App
