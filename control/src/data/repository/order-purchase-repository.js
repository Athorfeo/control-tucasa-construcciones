import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/navbar';
import Navigator from '../../../components/navigator';
import Loading from "../../../components/loading";
import NoCancelableModal from "../../../components/no-cancelable-modal";
import ErrorModal from "../../../components/error-modal";
import AddProductDetailOrderPurchase from "./add-product-detail-order-purchase";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllOrderPurchase, fetchAppendOrderPurchase } from "../../../../network/purchase-api";
import { fetchAllSuppliers } from "../../../../network/data-api";
import { storageConfig, getJsonItem } from "../../../../util/storage-util";
import * as bootstrap from 'bootstrap';

export const orderPurchaseRepository = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility
  };
}