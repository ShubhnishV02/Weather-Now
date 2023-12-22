import React from 'react';

export default function Footer() {
    return (
        <div>
            <div className="container">
                <footer className='footer-main-section text-white'>
                    <div className='py-3 justify-content-center align-items-center border-bottom'>
                        <h5>Follow us on :</h5>
                        <i className='fa-brands fa-facebook mx-3 my-1 fs-3'></i>
                        <i className='fa-brands fa-instagram mx-3 my-1 fs-3'></i>
                        <i className='fa-brands fa-github mx-3 my-1 fs-3'></i>
                        <i className='fa-brands fa-linkedin mx-3 my-1 fs-3'></i>
                        <i className='fa-brands fa-whatsapp mx-3 my-1 fs-3'></i>
                    </div>
                    <div className='pt-2' style={{fontWeight: "600"}}>
                        <p className="text-center text-muted">Weather Now© 2023, Created by -Shubhnish Verma</p>
                    </div>

                </footer>
            </div>

        </div>
    )
}
