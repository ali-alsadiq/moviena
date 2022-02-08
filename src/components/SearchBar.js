import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import $ from 'jquery'
import { Formik } from 'formik'

function SearchBar() {
  //   const [searchQuerry, setSearchQuerry] = useState('')

  let history = useHistory()
  function handleSearch(searchQuerry) {
    history.push({
      pathname: `/search/${searchQuerry}`,
      state: { searchQuerry },
    })
  }

  return (
    <div>
      <Formik
        initialValues={{ text: '' }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setSubmitting(false)
          handleSearch(values.text)
          resetForm({ Values: '' })
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.text}
            />
          </form>
        )}
      </Formik>
      {/* <input
        id="input"
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        onChange={(e) => setSearchQuerry(e.target.value)}
        type="text"
        placeholder="Search..."
      />
      <Link
        to={{
          pathname: `/search/${searchQuerry}`,
          state: { searchQuerry },
        }}
      >
        Search
      </Link> */}
    </div>
  )
}

export default SearchBar
