<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/22/14
 * Time: 5:47 PM
 */

namespace Bux\BlogBundle\Form\Type;

use Bux\UserBundle\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class NewBlogFormType
 *
 * @package Bux\BlogBundle\Form\Type
 */
class NewBlogFormType extends AbstractType
{
    /* @var $user User */
    private $user;

    /**
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('text', 'textarea', array(
                'required'    => false,
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('category', 'entity', array(
                'class'         =>  'Bux\BlogBundle\Entity\BlogCategory',
                'choices' => $this->user->getBlogCategories(),
                'constraints'   => array(
                    new NotBlank()
                ),
                'empty_value'  => ' '
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\BlogBundle\Entity\Blog',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'new_blog_form_type';
    }
} 