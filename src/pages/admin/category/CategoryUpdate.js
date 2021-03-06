import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/Forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategory(match.params.slug).then((cat) => setName(cat.data.name));
  }, [match.params.slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`Category "${res.data.name}" is updated sucessfully`);
        history.push("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
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
              <h4>Update category</h4>
            )}
            <CategoryForm
              handleSubmit={handleSubmit}
              setName={setName}
              name={name}
              btnName="Update"
              enable={true}
            />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
