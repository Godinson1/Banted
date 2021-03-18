import React, { useState } from 'react';
import Carousel from 'react-images';
import Modal from "react-bootstrap/Modal";
import useModal from './useModal';
import './modal.css';

const images = [{ source: '/images/no-img.png' }, { source: '/images/ronaldo.jpg' }];

const AlternativeMedia = () => {
  //const [modalIsOpen, setModalIsOpen] = useState(false)
  const[show, setShow] = useState(false);


    return (
      <div className="App">
      <button className="button-default" onClick={() => setShow(true)}>Show Modal</button>
      <Modal
       show={show}
       onHide={() => setShow(false)}
       dialogClassName="modal-90w"
       aria-labelledby="example-custom-modal-styling-title"
     >
       <Modal.Header closeButton>
         <Modal.Title id="example-custom-modal-styling-title">
           Custom Modal Styling
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <p>
           Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
           commodi aspernatur enim, consectetur. Cumque deleniti temporibus
           ipsam atque a dolores quisquam quisquam adipisci possimus
           laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
           accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
           reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
           deleniti rem!
         </p>
       </Modal.Body>
     </Modal>
            <Carousel views={images} id="ll"/>
      </div>
    );
  }

export default AlternativeMedia;