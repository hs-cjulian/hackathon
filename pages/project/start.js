import React, { useState, useRef, useEffect } from 'react';
import css from "@/styles/start.module.scss";
import planCss from "@/styles/plan.module.scss";

export default function Start() {
  const [ postalCode, setPostalCode ] = useState("");
  const inputElement = useRef();

  useEffect(() => {
    inputElement?.current?.focus();
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.assign('/project/plan?postalCode=' + postalCode.replace(/\s/g, '').toUpperCase());
    return false;
  }

  return (
    <div className={css.start}>
      <div className={planCss.header}>
        <a href={"http://localhost:3000"}><img src={'/logo.svg'} /></a>
        <ul className={planCss.nav}>
          <li className={planCss.navItem}>Browse Categories</li>
          <li className={planCss.navItem}>Write a Review</li>
          <li className={planCss.navItem} style={{fontWeight: 600}}>Project Planner</li>
        </ul>
      </div>
      <div className={css.content}>
        <div className={css.formWrapper}>
          <p className={css.message}>
            Unlock a tailored renovation plan. Invest in the <strong>longevity and value of Your Home</strong>
          </p>
          <form onSubmit={handleSubmit} className={css.form}>
            <input
              className={css.input}
              type="text"
              id="postal-code"
              name="postal-code"
              required minLength="6" maxLength="7"
              onChange={(e) => setPostalCode(e.target.value)}
              value={postalCode}
              ref={inputElement}
              placeholder={'Your postal code'}
            />
            <button className={css.button} type={"submit"}>Build My Plan</button>
          </form>
          <label className={css.label} htmlFor={"postal-code"}>Enter you postal code to create a renovation plan</label>
        </div>
        <div className={css.image} />
      </div>
    </div>
  )
}