import { useState, useRef, useEffect } from 'react';

export default function Start() {
  const [ postalCode, setPostalCode ] = useState("");
  const inputElement = useRef();

  useEffect(() => {
    inputElement?.current?.focus();
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.assign('/project/plan?postalCode=' + postalCode);
    return false;
  }

  return (
    <div>
      <p>
        Unlock a tailored maintenance plan. Invest in the <strong>longevity and value of Your Home</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="postal-code"
          name="postal-code"
          required minLength="6" maxLength="7"
          onChange={(e) => setPostalCode(e.target.value) }
          value={postalCode}
          ref={inputElement}
        />
        <button type={"submit"}>Get Started</button>
      </form>
    </div>
  )
}