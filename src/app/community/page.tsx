'use client';

import Modal from './modal';
import React, { useState }from 'react'
import { ScOpenPostBox } from './style';

function Community() {

  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  const [post, setPost] = useState("");
  const [isWritingPost, setIsWritingPost] = useState(false);
  
  const addPost = () => {
    
  }
  
  return (
    <>
      <section>talk will your start</section>
      <ScOpenPostBox>
        <img />
        <div>
        {/* 클릭하면 개시글 추가 모달 or 페이지로 이동 */}
        {showModal && <Modal clickModal={clickModal}/>}
        </div>
        <div>
        <div>사진추가 파일 바로열기</div>
        <div>동영상추가 파일 바로열기</div>
        </div>
      </ScOpenPostBox>
      <form>
        <input></input>
        <div>
          <button>추가하기</button>
          <button>수정하기</button>
          <button>삭제하기</button>
        </div>
      </form>
    </>
  )
}

export default Community