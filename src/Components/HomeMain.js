import React from 'react';

export default function HomeMain() {
  return (
    <div className='main-page-bg'>
      <div>
        <h1 className='Home-heading'>Weather Now</h1>
        <p className="home-lead">Get the current weather information for any location on Earth.</p>
      </div>

      <div className="container">
                <footer className='home-forecast-created-by'>
                    <div className='pt-2'>
                        <p className="text-center">Weather Now© 2023, Created by -Shubhnish Verma</p>
                    </div>

                </footer>
            </div>
    </div>
  )
}
