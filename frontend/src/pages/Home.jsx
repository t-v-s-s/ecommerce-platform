import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
export default function Home() {
    return (
        <div className="bg-background min-h-screen">
            <Header />
            <Hero />
            <ProductList />
            <Footer />
        </div>
    );
}