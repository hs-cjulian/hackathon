export default function Start() {
  return (
    <div>
      <p>
        Unlock a tailored maintenance plan. Invest in the <strong>longevity and value of Your Home</strong>
      </p>
      <form>
        <input type="text" id="postal-code" name="postal-code" required minLength="4" maxLength="8" size="10"/>
        <button type={"submit"}>Get Started</button>
      </form>
    </div>
  )
}