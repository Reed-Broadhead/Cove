import {useFormik} from "formik"
import * as yup from "yup"
import axios from "axios"

function MakeServer(user) {
    // console.log(user.user.value.user.id)

    const handleCreate = (data) => {
        console.log(data)
    }

    const formik = useFormik({
        initialValues: {
            serverName: null,
            ownerId: user.user.value.user.id
        },
        validationSchema : yup.object({
            serverName: yup.string().min(3, "cant be less than 3 characters").max(8, "cant be more then 8 characters"),
            ownerId: yup.string()
        }),
        onSubmit: async (values) => {
            handleCreate(values)
        }
    })

    return (
        <div>
            <h1>gonna remove</h1>
            <form className="text-black" onSubmit={formik.handleSubmit}>
                <input id="serverName" name="serverName" value={formik.values.serverName} onChange={formik.handleChange}/>
                <button type="submit"> enterName</button>
            </form>
        </div>
    )
}

export default MakeServer