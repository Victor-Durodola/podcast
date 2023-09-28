import '../NewsletterSignUp.css'
export default function NewsletterSignUp() {
  return (
    <>
      <div className="wrapper">
        <div className="inner-wrapper">
          <div className="platform-choice">
            <h1>Enjoy and learn from your prefered platform</h1>
          </div>
          <div className="form-section">
            <h1>Join our newsletter</h1>
            <h2 className='sub-heading'>get weekly access to our latest updates and deals</h2>
            <form action="" className='form'>
                <div className="form-input">
                  <label htmlFor="email" className='email-label'>
                      <input type="email" name="email" id="email" />
                  </label>
                  <button className='form-btn'>Join</button>
                </div>
            </form>
            <p className='advice'>No spam, we hate it more than you do</p>
          </div>
        </div>
      </div>
    </>
  )
}
