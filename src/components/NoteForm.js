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
          // 網路上資料說handleSubmit會回傳promise就可以.then(form.reset)
          // 結果嘗試了發現回傳undefined,資料查了一整天,自己console.log(props)一個個看
          // 找到valid會因為validate而改變,所以改用valid判定是否reset
          // 但發現reset了之後可以傳出formValues,卻造成validate生成error object,
          // 最後在renderError的props找到submitFailed, 多加一個判斷,
          // form submit成功後submitFailed會變成false,renderError就不會被送出!!
          // (推斷:按下submit button前validate是通過的(valid),按下之後就直接執行reset,
          // form內的input改變,又觸發了validate不通過=>跳出renderError
          // 最後再加上submitFailed如果true才會跳出renderError)
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
