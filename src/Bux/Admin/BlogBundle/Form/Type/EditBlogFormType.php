<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/18/14
 * Time: 11:58 AM
 */

namespace Bux\Admin\BlogBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class EditBlogFormType
 *
 * @package Bux\Admin\BlogBundle\Form\Type
 */
class EditBlogFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', 'text', array(
                'required'  => false,
            ))
            ->add('text', 'textarea', array(
                'required'  => false,
                'attr'      => array(
                    'class' => 'tinymce'
                )
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
        return 'blog_edit_form_type';
    }
}