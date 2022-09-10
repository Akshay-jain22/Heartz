import React from 'react'

import MultipleFormat from '../assets/Mul_format.png'
import Hyperlink from '../assets/Hyperlink.png'
import MultipleSpeaker from '../assets/MultipleSpeaker.png'
import Multilingual from '../assets/Multilingual.png'
import accuracy from '../assets/accuracy.png'
import titlegen from '../assets/titlegen.png'
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import * as FaIcons from 'react-icons/fa';

const Docs = () => {
    // return (
    //     <>  </>
    // )
  return (
    <>
         <div className='row' style={{ height: 'auto', paddingTop: '4vh' }}>
                <h2><u>How is Heartz built?</u></h2>
                <div className='row'>
                    <p style={{ fontSize: '2.3ex' }}>IS FIELD KA GYAN LIKHEIN<br />
                       
                    </p>
                </div>
                <div className='row' style={{ textAlign: 'justify', fontSize: '2.3ex' }}>
                    <p></p>
                    <br></br>
                </div>
            </div>

          <hr />

          <div>

          <h2><u> Different features implemented in Heartz?</u></h2>
          <div className='row mt-5'>
                    {/* <div className='col'> */}
                        {/* <img src={MultipleFormat} alt='MultipleFormat' className='img-fluid' width="100%" /> */}
                    {/* </div> */}
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Multiple Formats</h4>
                        <p style={{ fontSize: '2.3ex' }}>IS FIELD KA GYAN LIKHEIN
                        </p>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Hyperlinks</h4>
                        <p style={{ fontSize: '2.3ex' }}>IS FIELD KA GYAN LIKHEIN
                        </p>
                    </div>
                    {/* <div className='col'> */}
                        {/* <img src={Hyperlink} alt='Hyperlink' className='img-fluid' width="100%" /> */}
                    {/* </div> */}
                </div>
                <div className='row mt-3'>
                    {/* <div className='col'> */}
                        {/* <img src={MultipleSpeaker} alt='MultipleSpeaker' className='img-fluid' width="100%" /> */}
                    {/* </div> */}
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Multiple Speakers</h4>
                        <p style={{ fontSize: '2.3ex' }}>IS FIELD KA GYAN LIKHEIN
                        </p>
                    </div>
                </div>


                <div className='row mt-3'></div>

                <div className='row'>
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Multilingual</h4>
                        <p style={{ fontSize: '2.3ex' }}> IS FIELD KA GYAN LIKHEIN
                        </p>
                    </div>
                    {/* <div className='col'> */}
                        {/* <img src={Multilingual} alt='Multilingual' className='img-fluid' width="100%" /> */}
                    {/* </div> */}
                </div>


                <div className='row mt-3'>
                    {/* <div className='col'> */}
                        {/* <img src={accuracy} alt='accuracy' className='img-fluid' width="100%" /> */}
                    {/* </div> */}
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Accuracy</h4>
                        <p style={{ fontSize: '2.3ex' }}>IS FIELD KA GYAN LIKHEIN
                        </p>
                    </div>
                </div>



                <div className='row mt-3 mb-5'>
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Title Generation</h4>
                        <p style={{ fontSize: '2.3ex' }}>IS FIELD KA GYAN LIKHEIN
                        </p>
                    </div>
                    {/* <div className='col'> */}
                        {/* <img src={titlegen} alt='titlegen' className='img-fluid' width="100%" /> */}
                    {/* </div> */}
                </div>


                <hr />


                <div className='row mb-5'>
                    <h2>How to use Heartz?</h2>
                    <div className='row'>
                        <p style={{ fontSize: '2.3ex' }}>IS FIELD KA GYAN LIKHEIN </p>
                    </div>
                </div>

                <hr />
                <div className='row mb-5'>
                    <h2>DEVELOPERS</h2>
                <MDBRow>
                    <div className='col'> 
                    <img src={titlegen} alt='titlegen' className='img-fluid' width="100%" />
                    <strong style={{ fontSize: '3ex' }}>hello worke</strong>
                    
                    <div className="kuchbheelikho">
                        <FaIcons.FaLinkedinIn className="icon_hp"  onClick={()=> window.open("https://www.qries.com/", "_blank")}/>
                    </div>
                    {/* .icon_hp_outer{
  background-color: #90191b;
  height: 28px; width: 28px;
  border-radius: 50%;
  padding: 5px;
  margin: 10px 3px;
} */}

                    
                    </div>

                     <div className='col'> 
                        <img src={titlegen} alt='titlegen' className='img-fluid' width="100%" />
                        <strong style={{ fontSize: '3ex' }}>ndjsnjd</strong>
                     </div>

                     <div className='col'> 
                        <img src={titlegen} alt='titlegen' className='img-fluid' width="100%" />
                        <strong style={{ fontSize: '3ex' }}>ndiskndks</strong>
                     </div>
                    
                </MDBRow>


                {/* <MDBRow>
     
                </MDBRow> */}

                {/* <div>
                <div className='col' style={{ display: 'flex' }}> 
                        <img src={titlegen} alt='titlegen' className='img-fluid' width="30%" />
                        <p> hello world</p>
                     </div>

                     <div className='col'> 
                        <img src={titlegen} alt='titlegen' className='img-fluid' width="30%" />
                        <p> hello world</p>
                     </div>

                     <div className='col'> 
                        <img src={titlegen} alt='titlegen' className='img-fluid' width="30%" />
                        <p> hello world</p>
                     </div>
                </div> */}
                    
                </div>



          </div>





          

          
    </>
  )
}

export default Docs