import { test, expect } from '@playwright/test';

test.describe.parallel("API Testing", () => {
  const baseUrl = 'https://reqres.in/api/';
  //To only run one test write the following
  //test.only("Existing endpoint", async ({ request }) => {
  test("Existing endpoint", async ({ request }) => {
    const response = await request.get(`${baseUrl}users/2`)
    expect(response.status()).toBe(200)
    // const responseBody = JSON.parse(await response.text())
    // console.log(responseBody)
  })

  test("Non existing endpoint", async ({ request }) => {
    const response = await request.get(`${baseUrl}users/non-existing`)
    expect(response.status()).toBe(404)
  })

  test("Creating a user through POST endpoint", async ({ request }) => {
    const response = await request.post(`${baseUrl}users`, {
      data: {
        name: "morpheus",
        job: "leader"
      }
    })
    expect(response.status()).toBe(201)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.createdAt).toBeTruthy()
    console.log(responseBody)
  })

  test("Get user details", async ({ request }) => {
    const response = await request.get(`${baseUrl}users/12`)
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(12)
    expect(responseBody.data.email).toBe("rachel.howell@reqres.in")
    console.log(responseBody.data.id)
  })

  test("Login Successful", async ({ request }) => {
    const response = await request.post(`${baseUrl}login`, {
      data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      }
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    console.log(responseBody.token)
    expect(responseBody.token).toBeTruthy()
  })

  test("Update a usert", async ({ request }) => {
    const response = await request.put(`${baseUrl}users/2`, {
      data: {
        name: "Anakin Skywalker",
        job: "Master Sith"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe("Anakin Skywalker")
    expect(responseBody.job).toBe("Master Sith")
    console.log(responseBody.name, "\n", responseBody.job)
  })

  test("Delete a user", async ({ request }) => {
    const response = await request.delete(`${baseUrl}users/2`)
    expect(response.status()).toBe(204)
  })

})