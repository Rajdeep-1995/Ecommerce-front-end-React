import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/Forms/CategoryForm";
import LocalSearch from "../../../components/Forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  const loadCategories = () => {
    getCategories().then((cat) => setCategories(cat.data));
  };

  useEffect(() => {
    loadCategories();
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory(user.token, { name })
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`Category "${res.data.name}" is added sucessfully`);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  //searching method
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const handleRemove = async (slug) => {
    let confirmAnswer = window.confirm(`Delete ${slug} category?`);
    if (confirmAnswer) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((r) => {
          setLoading(false);
          loadCategories();
          toast.error(`Category ${r.data.name} is deleted sucessfully`);
        })
        .catch((e) => {
          if (e.response.status === 400) {
            setLoading(false);
            toast.error(e.response.data);
            console.log(e);
          }
        });
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>Create category</h4>
            )}
            <CategoryForm
              handleSubmit={handleSubmit}
              setName={setName}
              name={name}
              btnName="Add"
              enable={false}
            />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            <hr />
            <h4>Existing Categories</h4>
            {categories.filter(searched(keyword)).map((c) => (
              <div className="alert alert-secondary" key={c._id}>
                {c.name}
                <span className="btn btn-sm float-right">
                  <Link to={`/admin/category/${c.slug}`}>
                    <EditOutlined />
                  </Link>
                </span>
                <span className="btn btn-sm float-right">
                  <DeleteOutlined
                    onClick={() => handleRemove(c.slug)}
                    className="text-danger"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
