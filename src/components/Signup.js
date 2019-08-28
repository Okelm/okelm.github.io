import React from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import Message from "./message"

const SubscribeFormWrapper = styled.div({
  color: "white",
  maxWidth: "350px",
  padding: "40px",
  backgroundImage:
    "linear-gradient(150deg, #007acc 0%, #3155dc 100%), linear-gradient(45deg, rgba(255, 255, 255, 0.35) 66%, rgba(0, 0, 0, 0.25) 100%)",
  borderRadius: "5px",
})

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    margin: 10px 0;
  }
  .field-error {
    display: block;
    color: rgba(255, 255, 255, 0.75);
    font-size: 80%;
  }
  input,
  label {
    width: 100%;
    font-size: 16px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    width: auto;
    label,
    input {
      margin: 5px 0 0 0 !important;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  button {
    margin-top: 20px;
    font-size: 16px;
  }
`

function PostSubmissionMessage() {
  return (
    <div
      css={css`
        h2 {
          color: white !important;
        }
      `}
    >
      <Message
        title="Great, one last thing..."
        body="I just sent you an email with the confirmation link. 
          **Please check your inbox!**"
      />
    </div>
  )
}

const validationSchema = Yup.object().shape({
  email_address: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  first_name: Yup.string(),
})

const handleSubmit = (setFinished, setResultMessage) => (values, actions) => {
  addToMailchimp(values.email_address, { FNAME: values.first_name })
    .then(data => {
      if (data.result === "success") {
        setFinished(true)
        setResultMessage("")
      } else {
        const { msg } = data
        if (msg && msg.includes("is already subscribed")) {
          setResultMessage("This email has already been added")
        }
      }
      actions.setSubmitting(false)
    })
    .catch(() => {
      // docs say it never happens
    })
}

function Signup({ style, tags = [], header = "Join the Newsletter" }) {
  const [finished, setFinished] = React.useState(false)
  const [resultMessage, setResultMessage] = React.useState("")
  return (
    <SubscribeFormWrapper style={style}>
      {!finished && (
        <>
          <h3
            css={css`
              margin-bottom: 8px;
              margin-top: 0;
              color: white;
            `}
          >
            {header}
          </h3>
          <Formik
            initialValues={{
              email_address: "",
              first_name: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit(setFinished, setResultMessage)}
            render={() => (
              <StyledForm>
                <label htmlFor="first_name">
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-end;
                    `}
                  >
                    First Name
                    <ErrorMessage
                      name="first_name"
                      component="span"
                      className="field-error"
                    />
                  </div>
                </label>
                <Field
                  id="first_name"
                  aria-required="false"
                  name="first_name"
                  placeholder="Deann"
                  type="text"
                />
                <label htmlFor="email">
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-end;
                    `}
                  >
                    Email
                    <ErrorMessage
                      name="email_address"
                      component="span"
                      className="field-error"
                    />
                  </div>
                </label>
                <Field
                  id="email"
                  aria-required="true"
                  name="email_address"
                  placeholder="deann@random.io"
                  type="email"
                />
                <button data-element="submit" type="submit">
                  Subscribe
                </button>
              </StyledForm>
            )}
          />
        </>
      )}

      {finished && <PostSubmissionMessage />}
      {resultMessage && <div>{resultMessage}</div>}
    </SubscribeFormWrapper>
  )
}

export default Signup
