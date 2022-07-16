import React,{useState, useEffect, useRef} from 'react'

import { submitComment } from '../services';

const CommentsForm = ({slug}) => {

  const [error, seterror] = useState(false);
  const [localStorage, setlocalStorage] = useState(null);
  const [showSuccessMessage, setshowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, [])
  

  const handleCommentSubmission = () => {
    seterror(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if(!comment || !name || !email){
      seterror(true);
      return;
    }

    const commentObj = {
      name, email, comment, slug
    };

    if(storeData){
      window.localStorage.setItem('Name', name);
      window.localStorage.setItem('Email', email);
    }else{
      window.localStorage.removeItem('Name', name);
      window.localStorage.removeItem('Email', email);
    }

    submitComment(commentObj).then((res) =>{
      setshowSuccessMessage(true);
      setTimeout(()=>{
        setshowSuccessMessage(false);
      }, 3000)
    })

  }


  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="txt-xl mb-8 font-semibold border-b pb-4">Leave a reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea 
        ref={commentEl} 
        className="p-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700" 
        placeholder="Comment"
        name="comment"
        />
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
        <input 
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700" 
          placeholder="Name"
          name="name"
        />
        <input 
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700" 
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true" />
          <label className="ml-2 text-gray-500 cursor-pointer" htmlFor="storeData">
            Remember name and email.
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required.</p>}

      <div className="mt-8">
        <button 
          type="button" 
          onClick={handleCommentSubmission}
          className="inline-block bg-teal-600 text-lg rounded-full h-11 text-white px-8 cursor-pointer" 
          
          >
          Post Comment
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comments submitted for review.</span>}
      </div>
    
    </div>
  )
} 

export default CommentsForm