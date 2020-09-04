<template>
  <section>
    <ProductForm :formState="formState" :product="product" @sendForm="sendForm()" />
    <v-data-table
      :headers="headers"
      :items="products"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn class="mx-2" fab small dark color="cyan" @click="setProduct(item)">
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="mx-2" fab small dark color="error" @click="deleteProduct(item._id)">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
import { Product } from "../models";
import productService from "../services/product.service";

const exampleProduct = {
  product_name: "Samsung Galaxy A",
  product_description: "cámara increíble, pantalla increíble",
  product_price: 420,
};

export default {
  data() {
    return {
      headers: [
        { text: "Nombre", value: "product_name" },
        { text: "Descripción", value: "product_description" },
        { text: "Precio", value: "product_price" },
        {
          text: "Acciones",
          align: "end",
          sortable: false,
          value: "actions",
        },
      ],
      formState: "Agregar",
      product: new Product(exampleProduct),
      products: [],
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    ...mapMutations(["setSnack"]),
    getProducts() {
      productService.all().then(response => {
        this.products = response.data;
      });
    },
    sendForm() {
      if (this.formState === "Agregar") this.addNewProduct();
      if (this.formState === "Actualizar") this.updateProduct();
    },
    addNewProduct() {
      console.log(this.product);
      productService.save(this.product).then((response) => {
        this.getProducts();
        this.product = new Product();
        this.setSnack({
          isOpen: true,
          text: response.data,
          color: "success"
        });
      });
    },
    setProduct(product) {
      this.product = {...product};
      this.formState = "Actualizar";
    },
    updateProduct() {
      productService.update(this.product._id, this.product).then((response) => {
        this.getProducts();
        this.product = new Product();
        this.setSnack({
          isOpen: true,
          text: response.data,
          color: "success"
        });
        this.formState = "Agregar";
      });
    },
    deleteProduct(_id) {
      productService.delete(_id).then(() => {
        this.getProducts();
        this.setSnack({
          isOpen: true,
          text: 'Producto eliminado con exito',
          color: "success"
        });
      });
    },
  },
};
</script>
