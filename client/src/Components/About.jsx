import React from 'react'
import MultipleFormat from '../assets/Mul_format.png'
import Hyperlink from '../assets/Hyperlink.png'
import MultipleSpeaker from '../assets/MultipleSpeaker.png'
import Multilingual from '../assets/Multilingual.png'
import accuracy from '../assets/accuracy.png'
import titlegen from '../assets/titlegen.png'

const About = () => {
    return (
        <>
            <div className='row' style={{ height: 'auto', paddingTop: '4vh' }}>
                <h2><u>Why is Heartz built?</u></h2>
                <div className='row'>
                    <p style={{ fontSize: '2.3ex' }}>Heartz creates simple and understandable notes from audio recordings.<br />
                        This platform helps students, office workers, teachers and others in making notes from online meetings.
                    </p>
                </div>
                <div className='row' style={{ textAlign: 'justify', fontSize: '2.3ex' }}>
                    <p>In our present world, communication plays a key role in our daily progress.
                        Conveying the correct information and to the right person concerned is important on every level.
                        The world is becoming a hub of digitization and so is communication.
                        Text and speech are the two major methods for conveying your message.
                        There are many ways devised to convert these two methods of communication among each other.
                        Heartz is developed to help in these situation of speech to pdf conversion.</p>
                    <br></br>
                </div>
            </div>

            <hr />

            <div className='row' style={{ textAlign: 'justify' }}>
                <h2><u>What is different in Heartz?</u></h2>

                <div className='row mt-5'>
                    <div className='col'>
                        <img src={MultipleFormat} alt='MultipleFormat' className='img-fluid' width="100%" />
                    </div>
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Multiple Formats</h4>
                        <p style={{ fontSize: '2.3ex' }}>As there are many formats for audio, we are providing the user with multiple formats like mp3,  aac, wav, etc. Video uploading format is also provided for better user experience, wherein we can upload videos from multiple formats like mp4, mkv, mov. URL link format is also provided for ease use for users, wherein if the user needs to make notes of the online video, then providing the link will do the job.
                        </p>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Hyperlinks</h4>
                        <p style={{ fontSize: '2.3ex' }}>In the final document file generated, it contains many hyperlinks which will make for a better user experience. These hyperlinks are generated for the words for better understanding and for the important topics mentioned in the audio recordings.
                        </p>
                    </div>
                    <div className='col'>
                        <img src={Hyperlink} alt='Hyperlink' className='img-fluid' width="100%" />
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col'>
                        <img src={MultipleSpeaker} alt='MultipleSpeaker' className='img-fluid' width="100%" />
                    </div>
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Multiple Speakers</h4>
                        <p style={{ fontSize: '2.3ex' }}>The recordings may contain multiple speakers;
                            in this regard we are providing the users with document files where the different
                            speakers are identified and mentioned accordingly with the available speaker conventions
                            like speaker 1, speaker 2 etc.
                        </p>
                    </div>
                </div>

                <div className='row mt-3'></div>
                <div className='row'>
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Multilingual</h4>
                        <p style={{ fontSize: '2.3ex' }}>In the final document file generated, it contains many hyperlinks which will make for a better user experience. These hyperlinks are generated for the words for better understanding and for the important topics mentioned in the audio recordings.
                        </p>
                    </div>
                    <div className='col'>
                        <img src={Multilingual} alt='Multilingual' className='img-fluid' width="100%" />
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col'>
                        <img src={accuracy} alt='accuracy' className='img-fluid' width="100%" />
                    </div>
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Accuracy</h4>
                        <p style={{ fontSize: '2.3ex' }}>There is also an option for comparing the generated file with the original available file to find the accuracy of our generated pdf file.
                        </p>
                    </div>
                </div>

                <div className='row mt-3 mb-5'>
                    <div className='col'>
                        <h4 style={{ padding: '1px' }}>Title Generation</h4>
                        <p style={{ fontSize: '2.3ex' }}>In the final document file generated, it contains many hyperlinks which will make for a better user experience. These hyperlinks are generated for the words for better understanding and for the important topics mentioned in the audio recordings.
                        </p>
                    </div>
                    <div className='col'>
                        <img src={titlegen} alt='titlegen' className='img-fluid' width="100%" />
                    </div>
                </div>

                <hr />

                <div className='row mb-5'>
                    <h2>How to use Heartz?</h2>
                    <div className='row'>
                        <p style={{ fontSize: '2.3ex' }}>In Heartz, first we upload audio or video file or provide an URL
                            link in the space available from which we obtain our recordings required for the further process.
                            After the uploading is completed, the conversion of audio to text starts.
                            The text is further processed to a document. We can download the document generated using the
                            'Download' option. We can also translate the document into another available Indian languages using the
                            'Translate' option and selecting the desired language from the available languages. We also have 'Multiple Speaker'
                            option which can be used for the audio recordings with multiple users. </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About