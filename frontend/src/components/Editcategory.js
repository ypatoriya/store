import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Editcategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [editCategory, setEditCategory] = useState({
        categoryName: '',
    });

    useEffect(() => {
        const fetchCategory = async () => {

            const headers = {
                'Authorization': localStorage.getItem('accessToken')
            }

            axios.get(`http://localhost:5000/api/categorybyId/${id}`, {headers})

            .then((response) => {
                setEditCategory(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
       fetchCategory();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditCategory({ ...editCategory, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken')
        }

        axios.put(`http://localhost:5000/api/editCategory/${id}`, editCategory, {headers})

        .then((response) => {
            console.log(response.data);
            navigate('/category');
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="container">
            <h1>Edit Category</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">Category Name</label>
                    <input type="text" className="form-control" id="categoryName" name="categoryName" value={editCategory.categoryName} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}   

export default Editcategory