import bcrypt from 'bcryptjs'
const data={
    users: [
        {
          name: 'John',
          email: 'admin@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: true,
        },
        {
          name: 'Jane',
          email: 'user@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: false,
        },
      ],
    products:[
        {
            name:'BTSshirt',
            slug:'BTSshirt',
            category:'Shirts',
            image:'/image/bts.webp',
            price:70,
            brand:'H&M',
            rating:4.5,
            numReviews:8,
            countInStock:12,
            description: 'This is a popular shirt from Nike',
            isFeatured:true,
            banner:'/image/banner1.jpg'
        },
        {
            name:'Jacket',
            slug:'Jacket',
            category:'Jacket',
            image:'/image/jacket-1.jpg',
            price:75,
            brand:'H&M',
            rating:4.5,
            numReviews:8,
            countInStock:12,
            description: 'This is a popular shirt from Nike',
            isFeatured:true,
            banner:'/image/banner2.jpg'
        },
        {
            name:'Blueshirt',
            slug:'Blueshirt',
            category:'Shirts',
            image:'/image/blue1.webp',
            price:25,
            brand:'Nike',
            rating:4.5,
            numReviews:8,
            countInStock:12,
            description: 'This is a popular shirt from Nike',
            isFeatured:true,
            banner:'/image/banner3.jpg'
        },
        {
          name:'greenshirt',
          slug:'greenshirt',
          category:'Shirts',
          image:'/image/greenshirt1.webp',
          price:80,
          brand:'Zara',
          rating:4.5,
          numReviews:8,
          countInStock:12,
          description: 'This is a popular shirt from Nike',
          isFeatured:true,
          banner:'/image/banner4.webp'
        }
       ]
}
export default data;