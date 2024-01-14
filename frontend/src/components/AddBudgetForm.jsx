// reacts
import { useEffect, useRef, useState } from "react";
import axios from 'axios'
// rrd imports
import { Form, useFetcher } from "react-router-dom"

// library imports
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid"

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef();
  const focusRef = useRef();


  const [formvalue ,setFormvalue]= useState({newBudget:"" , newBudgetAmount :"" })
const handleInput = (e) =>{
  const {name , value}= e.target;
  setFormvalue((prev)=> ({...formvalue,[name]: value}))
  console.log(formvalue);
}

// const handleSubmit = async (e) => {
//   e.preventDefault();

// };



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:50000/post', {
      newBudget: formvalue.newBudget,
      newBudgetAmount: formvalue.newBudgetAmount,
    });

    console.log('Budget created:', response.data);
    setFormvalue({ newBudget: '', newBudgetAmount: '' });
  } catch (error) {
    console.error('Error creating budget:', error);
    // Handle error state or display an error message to the user
  }
};

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  return (
    
    <div className="form-wrapper">
      <h2 className="h3">
        Create budget
      </h2>
 
      <fetcher.Form
  method="post"
  className="grid-sm"
  ref={formRef}
  // onSubmit={handleSubmit} // Add this line to trigger the handleSubmit function
>
        <div className="grid-xs" >
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            value={formvalue.newBudget}
            onChange={handleInput}
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            onChange={handleInput}
            value={formvalue.newBudgetAmount}
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., Rs. 3500"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting} onSubmit={handleSubmit}>
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Create budget</span>
                <CurrencyRupeeIcon width={20} />
              </>
            )
          }
        </button>
  
      </fetcher.Form>
     
    </div>
  )
}
export default AddBudgetForm





// import { useEffect, useRef, useState } from "react";
// import axios from 'axios'
// import { useFetcher } from "react-router-dom"
// import { CurrencyRupeeIcon } from "@heroicons/react/24/solid"

// const AddBudgetForm = () => {
//   const fetcher = useFetcher();
//   const isSubmitting = fetcher.state === "submitting"

//   const formRef = useRef();
//   const focusRef = useRef();

//   const [formvalue, setFormvalue] = useState({ newBudget: "", newBudgetAmount: "" });

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setFormvalue((prev) => ({ ...formvalue, [name]: value }));
//     console.log(formvalue);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await axios.post('http://localhost:50000/post', {
//         newBudget: formvalue.newBudget,
//         newBudgetAmount: formvalue.newBudgetAmount,
//       });
  
//       console.log('Expense created:', response.data); // Log successful response
//       setFormvalue({ newBudget: '', newBudgetAmount: '' });
//     } catch (error) {
//       console.error('Error creating budget:', error);
//       console.error('Error details:', error.response || error.request || error.message); // Log error details
//       // Handle error state or display an error message to the user
//     }
//   };
  

//   useEffect(() => {
//     if (!isSubmitting) {
//       formRef.current.reset();
//       focusRef.current.focus();
//     }
//   }, [isSubmitting]);

//   return (
//     <div className="form-wrapper">
//       <h2 className="h3">Create budget</h2>
//       <form className="grid-sm" onSubmit={handleSubmit} ref={formRef}>
//         <div className="grid-xs">
//           <label htmlFor="newBudget">Budget Name</label>
//           <input
//             type="text"
//             name="newBudget"
//             id="newBudget"
//             value={formvalue.newBudget}
//             onChange={handleInput}
//             placeholder="e.g., Groceries"
//             required
//             ref={focusRef}
//           />
//         </div>
//         <div className="grid-xs">
//           <label htmlFor="newBudgetAmount">Amount</label>
//           <input
//             type="number"
//             step="0.01"
//             onChange={handleInput}
//             value={formvalue.newBudgetAmount}
//             name="newBudgetAmount"
//             id="newBudgetAmount"
//             placeholder="e.g., Rs. 3500"
//             required
//             inputMode="decimal"
//           />
//         </div>
//         <input type="hidden" name="_action" value="createBudget" />
//         <button type="submit" className="btn btn--dark" disabled={isSubmitting} >
//           {
//             isSubmitting ? <span>Submitting…</span> : (
//               <>
//                 <span>Create budget</span>
//                 <CurrencyRupeeIcon width={20} />
//               </>
//             )
//           }
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBudgetForm;
