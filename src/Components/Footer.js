import React from 'react';


function Footer() {

    // const handleClickAnchorTag = (event) => {
    // }


    return (
        <div>
            <div className="container">
                <footer className='footer-main-section text-white'>
                    <div className='py-3 justify-content-center align-items-center border-bottom'>
                        <h5>Follow us on :</h5>
                        <a href='https://www.facebook.com/shubhnish.verma.5' target='_blank' rel='noopener noreferrer'>
                            <i className='fa-brands fa-facebook mx-3 my-1 fs-3'></i>
                        </a>
                        <a href='https://www.instagram.com/shubhnish_verma/' target='_blank' rel='noopener noreferrer'>
                            <i className='fa-brands fa-instagram mx-3 my-1 fs-3'></i>
                        </a>
                        <a href='https://github.com/ShubhnishV02' target='_blank' rel='noopener noreferrer'>
                            <i className='fa-brands fa-github mx-3 my-1 fs-3'></i>
                        </a>
                        <a href='www.linkedin.com/in/shubhnish-verma-2b6654280' target='_blank' rel='noopener noreferrer'>
                            <i className='fa-brands fa-linkedin mx-3 my-1 fs-3'></i>
                        </a>
                        <a href='https://wa.me/8077468568' target='_blank' rel='noopener noreferrer'>
                            <i className='fa-brands fa-whatsapp mx-3 my-1 fs-3'></i>
                        </a>
                    </div>
                    <div className='pt-2' style={{ fontWeight: "600" }}>
                        <p className="text-center text-muted">Weather Now© 2023, Created by -Shubhnish Verma</p>
                    </div>

                </footer>
            </div>

        </div>
    )
}

export default Footer