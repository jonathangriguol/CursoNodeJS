import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

let cookie;
let productId;

describe("Testing User Session", () => {
  it("El endpoint POST auth/login debe loguear correctamente un usuario y generar una cookie", async () => {
    const mockUser = {
      email: "titin@naran.com",
      password: "123",
    };

    const result = await requester.post("/auth").send(mockUser);
    console.log(result.header);
    const cookieResult = result.header["set-cookie"][0];
    expect(cookieResult).to.be.ok;

    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1],
    };
    expect(cookie.name).to.be.ok.and.eql("authToken");
    expect(cookie.value).to.be.ok;
  });
});

describe("Testing Products", () => {
  it("El endpoint POST api/products debe crear un producto correctamente", async () => {
    const productMock = {
      code: 9999,
      title: "Product Test",
      description: "This is a mock product for testing",
      price: 1000,
      thumbnails: ["demo.jpg"],
      stock: 10,
      category: "testing",
      status: false,
    };

    // Se envia la cookie obtenida anteriormente
    const { statusCode, ok, _body } = await requester
      .post("/api/products")
      .set("Cookie", [`${cookie.name}=${cookie.value}`])
      .send(productMock);

    expect(statusCode).to.equal(200);

    productId = _body._id; // Guardo el ID del producto recien creado para borrarlo

    expect(_body).to.have.property("status").to.be.false;
  });

  it("El endpoint DELETE api/products/:pid debe eliminar un producto correctamente", async () => {
    const { statusCode, ok, _body } = await requester
      .delete(`/api/products/${productId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);

    expect(statusCode).to.equal(200);
  });
});
