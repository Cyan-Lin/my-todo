import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';

const NoteForm = props => {
  const [openRadioBox, setOpenRadioBox] = useState(false);

  const closeRadioBox = e => {
    if (!e.target.closest('.form__radios-box')) {
      setOpenRadioBox(false);
    }
  };
  useEffect(() => {
    document.body.addEventListener('click', closeRadioBox);
    return () => {
      document.body.removeEventListener('click', closeRadioBox);
    };
  }, []);

  const btnOpenRadioBoxOnClick = e => {
    e.preventDefault();
    setOpenRadioBox(true);
  };

  const onSubmit = formValues => {
    props.onSubmit(formValues);
  };

  // validate is going to be called every time the form is initially rendered
  // or the user interacts in any way
  const validate = formValues => {
    const errors = {};

    // if (!formValues.title) errors.title = 'You must enter a title';
    if (!formValues.description)
      errors.description = 'You must enter a description';

    return errors;
  };

  const renderError = ({ touched, error, submitFailed }) => {
    // console.log(touched, error, submitFailed);
    // touch => whether or not user enter into an input and deselected it
    if (touched && error && submitFailed) {
      return (
        <div className="message-container">
          <p className="message message--error">{error}</p>
        </div>
      );
    }
  };

  const renderInput = ({ input, meta }) => {
    // console.log(input);
    return (
      <>
        <input
          {...input}
          className="form__input-title"
          type="text"
          placeholder="Title"
          autoComplete="off"
        />
      </>
    );
  };

  const renderTextarea = ({ input, meta }) => {
    const className =
      meta.touched && meta.error && meta.submitFailed
        ? 'form__input-description form__input-description--error'
        : 'form__input-description';
    return (
      <>
        <textarea
          {...input}
          className={className}
          placeholder="Put your note here!"
        ></textarea>
        {renderError(meta)}
      </>
    );
  };

  const renderSelectBox = ({ input, meta, id, label }) => {
    // console.log(input);
    return (
      <>
        <div className="form__radios-group">
          <input
            {...input}
            type="radio"
            id={id}
            className="form__radios-input"
            onClick={() => setOpenRadioBox(false)}
          />
          <label
            // onClick={() => setOpenRadioBox(false)}
            htmlFor={id}
            className="form__radios-label"
          >
            {label}
          </label>
        </div>
      </>
    );
  };

  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, form, valid }) => {
        return (
          // ??????????????????handleSubmit?????????promise?????????.then(form.reset)
          // ???????????????????????????undefined,?????????????????????,??????console.log(props)????????????
          // ??????valid?????????validate?????????,????????????valid????????????reset
          // ?????????reset?????????????????????formValues,?????????validate??????error object,
          // ?????????renderError???props??????submitFailed, ??????????????????,
          // form submit?????????submitFailed?????????false,renderError??????????????????!!
          // (??????:??????submit button???validate????????????(valid),???????????????????????????reset,
          // form??????input??????,????????????validate?????????=>??????renderError
          // ???????????????submitFailed??????true????????????renderError)
          <form
            onSubmit={event => {
              handleSubmit(event);
              if (valid) {
                form.reset();
              }
            }}
            className="form"
          >
            <div className="form__radios">
              <label className="form__radios-tag">Label:</label>
              <div
                className="form__radios-box"
                id={`${openRadioBox ? 'form__radios-box--active' : ''}`}
                onClick={e => e.stopPropagation()}
              >
                <a
                  onClick={btnOpenRadioBoxOnClick}
                  href="/#"
                  className="btn btn--open-radio-box"
                >
                  openRadioBox
                </a>
                <Field
                  name="label"
                  type="radio"
                  component={renderSelectBox}
                  id="no-label"
                  value="no-label"
                  label="No label"
                />
                <Field
                  name="label"
                  type="radio"
                  component={renderSelectBox}
                  id="do-first"
                  value="do-first"
                  label="Do First"
                />
                <Field
                  name="label"
                  type="radio"
                  component={renderSelectBox}
                  id="schedule"
                  value="schedule"
                  label="Schedule"
                />
                <Field
                  name="label"
                  type="radio"
                  component={renderSelectBox}
                  id="delegate"
                  value="delegate"
                  label="Delegate"
                />
                <Field
                  name="label"
                  type="radio"
                  component={renderSelectBox}
                  id="delete"
                  value="delete"
                  label="Delete"
                />
              </div>
            </div>
            <div className="form__input-container">
              <Field type="txet" name="title" component={renderInput} />
              <Field
                type="textarea"
                name="description"
                component={renderTextarea}
              />
            </div>
            <div
              className={`form__control ${
                props.showControl ? '' : 'form__control--only-submit'
              }`}
            >
              <button
                onClick={e => props.handleEdit(e, 'pin')}
                type="button"
                className={`btn btn--pin ${
                  props.pin ? 'btn--pin--active' : ''
                }`}
              >
                &nbsp;
              </button>
              <button
                onClick={e => props.handleEdit(e, 'completed')}
                type="button"
                className={`btn btn--completed ${
                  props.completed ? 'btn--completed--active' : ''
                }`}
              >
                &nbsp;
              </button>
              <button
                onClick={props.handleDelete}
                type="button"
                className=" btn btn--delete"
              >
                &nbsp;
              </button>
              <button className="btn btn--submit">&nbsp;</button>
            </div>
          </form>
        );
      }}
    />
  );
};

export default NoteForm;
