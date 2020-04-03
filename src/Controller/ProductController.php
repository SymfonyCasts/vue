<?php

namespace App\Controller;


use App\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     * @param SerializerInterface $serializer
     * @return Response
     */
    public function index(SerializerInterface $serializer)
    {
        return $this->render('product/index.html.twig', [
            'categoriesJson' => $serializer->serialize($this->getCategories(), 'json'),
        ]);
    }

    /**
     * @Route("/category/{id}", name="app_category")
     * @param int $id
     * @param SerializerInterface $serializer
     * @return Response
     */
    public function showCategory(int $id, SerializerInterface $serializer)
    {
        return $this->render('product/index.html.twig', [
            'currentCategoryId' => $id,
            'categoriesJson' => $serializer->serialize($this->getCategories(), 'json'),
        ]);
    }

    /**
     * @Route("/product/{id}", name="app_product")
     * @param int $id
     * @param SerializerInterface $serializer
     * @return Response
     */
    public function showProduct(int $id, SerializerInterface $serializer)
    {
        return $this->render('product/index.html.twig', [
            'currentProductId' => $id,
            'categoriesJson' => $serializer->serialize($this->getCategories(), 'json'),
        ]);
    }

    /**
     * @return Category[]
     */
    private function getCategories() {
        $entityManager = $this->getDoctrine()->getManager();

        return $entityManager->getRepository(Category::class)->findAll();
    }
}
