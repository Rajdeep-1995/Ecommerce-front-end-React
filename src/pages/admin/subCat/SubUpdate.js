import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSub, updateSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/Forms/CategoryForm";
import LocalSearch from "../../../components/Forms/LocalSearch";

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // to get all parent category to select
  const [parent, setParent] = useState("");

  const loadCategories = () => {
    getCategories().then((cat) => setCategories(cat.data)); //to get all parent categories
  };

  const loadSubCategory = () => {
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });
  };

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`Sub category "${res.data.name}" is updated sucessfully`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  //searching method

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
              <h4>Update sub category</h4>
            )}
            <div className="form-group">
              <label>Choose a parent category</label>
              <select
                className="form-control"
                onChange={(e) => setParent(e.target.value)}
              >
                <option>Please select one</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option
                      key={c._id}
                      value={c._id}
                      selected={c._id === parent}
                    >
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <CategoryForm
              handleSubmit={handleSubmit}
              setName={setName}
              name={name}
              btnName="Update"
              enable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
