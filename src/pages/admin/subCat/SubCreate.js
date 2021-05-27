import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeSub, getSubs, createSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/Forms/CategoryForm";
import LocalSearch from "../../../components/Forms/LocalSearch";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // to get all parent category to select
  const [category, setCategory] = useState(""); // selected parent category by user
  const [keyword, setKeyword] = useState("");
  const [subs, setSubs] = useState([]);

  const loadCategories = () => {
    getCategories().then((cat) => setCategories(cat.data)); //to get all parent categories
  };

  const loadSubCategories = () => {
    getSubs().then((cat) => setSubs(cat.data)); //to get all sub categories
  };

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub(user.token, { name, parent: category })
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`Sub category "${res.data.name}" is added sucessfully`);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  //searching method
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const handleRemove = async (slug) => {
    let confirmAnswer = window.confirm(`Delete ${slug} sub category?`);
    if (confirmAnswer) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((r) => {
          setLoading(false);
          toast.error(`Sub category ${r.data.name} is deleted sucessfully`);
          loadSubCategories();
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
              <h4>Create sub category</h4>
            )}
            <div className="form-group">
              <label>Choose a parent category</label>
              <select
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Please select one</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <CategoryForm
              handleSubmit={handleSubmit}
              setName={setName}
              name={name}
              btnName="Add"
              enable={false}
            />

            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            <hr />
            <h4>Existing sub categories</h4>
            {subs.filter(searched(keyword)).map((c) => (
              <div className="alert alert-secondary" key={c._id}>
                {c.name}
                <span className="btn btn-sm float-right">
                  <Link to={`/admin/sub/${c.slug}`}>
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

export default SubCreate;
