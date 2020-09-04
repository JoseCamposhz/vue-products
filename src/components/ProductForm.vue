<template>
  <v-form class="mb-8" v-model="productForm" ref="productForm" onsubmit="return false;" @submit="sendForm()">
    <v-text-field
      v-model="product.product_name"
      :rules="productRules"
      label="Nombre"
      placeholder="Nombre"
    />
    <v-text-field
      v-model="product.product_description"
      :rules="productRules"
      label="Descripción"
      placeholder="Descripción"
    />
    <v-text-field
      v-model="product.product_price"
      label="Precio"
      placeholder="Precio"
      type="number"
    />
    <v-btn color="primary" type="submit">{{ formState }}</v-btn>
  </v-form>
</template>

<script>
import { mapMutations } from "vuex";
import { Product } from '../models';
export default {
  props: {
    formState: {
      type: String,
      default: 'Agregar'
    },
    product: {
      type: Object,
      default: () => {
        return new Product();
      }
    }
  },
  data() {
    return {
      productForm: true,
      productRules: [
        value => !!value || "Campo requerido",
        value => (value && value.length >= 3) || "Mínimo 3 caracteres"
      ]
    };
  },
  methods: {
    ...mapMutations(["setSnack"]),
    sendForm() {
      if (this.$refs.productForm.validate()) {
        // Utilizamos async - await para esperar que se emita el evento antes de resetear el formulario
        this.$emit("sendForm");
      } else {
        this.setSnack({
          isOpen: true,
          text: "Formulario inválido",
          color: "error"
        });
      }
    }
  }
};
</script>
