import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/Forms/FileUpload";
import { Spin } from "antd";
import { LoadingOutlined, WarningOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/Forms/ProductUpdateForm";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Blue", "Silver", "Brown", "White"], // All available colors, from backend
  brands: ["Apple", "Microsoft", "Samsung", "Lenovo", "ASUS", "HP", "Toshiba"], // All available brands, from backend
  color: "",
  brand: "",
};

const ProductUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  const [values, setValues] = useState(initialState);
  //to store all sub categories while selcting main category

  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubsId, setArrayOfSubsId] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCategories = () => {
    getCategories().then((cat) => {
      setCategories(cat.data);
    }); //to get all parent categories
  };

  const singleProduct = () => {
    //1.loading single product
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
      //2.loading single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      //3. make an array for ant design Select components as it requires value as an array, arr of an object is not allowed
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      setArrayOfSubsId((pre) => arr);
    });
  };

  const handleChangeOption = (e) => {
    // for getting all sub categories when a category is selected
    const id = e.target.value;
    setValues({ ...values, subs: [] }); // cleare the prev value of subs
    setCategorySelected(id); //storing changed category to saperate hook, so it will be possible to commapre the selected value with the origonal category i.e. values.category._id
    getCategorySubs(id).then((subs) => {
      setSubOptions(subs.data);
      console.log(subs.data);
    });
    if (values.category._id === e.target.value) {
      singleProduct();
    } else {
      setArrayOfSubsId([]);
    }
  };
  useEffect(() => {
    singleProduct();
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    values.subs = arrayOfSubsId; //pushing values of subs into values object
    values.category = categorySelected ? categorySelected : values.category;
    updateProduct(user.token, values, slug)
      .then((res) => {
        console.log(res);
        toast.success(`"${res.data.title}" is updated sucessfully`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); //to changing one parameter in values object
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col-md-10">
            <h4>Update Product</h4>
            {loading ? (
              <Spin indicator={antIcon} />
            ) : (
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            )}

            <ProductUpdateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setValues={setValues}
              values={values}
              categories={categories}
              handleChangeOption={handleChangeOption}
              subOptions={subOptions}
              arrayOfSubsId={arrayOfSubsId}
              setArrayOfSubsId={setArrayOfSubsId}
              categorySelected={categorySelected}
            />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
