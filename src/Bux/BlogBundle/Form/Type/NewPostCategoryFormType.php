<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/23/14
 * Time: 10:39 AM
 */

namespace Bux\BlogBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class NewPostCategoryFormType
 *
 * @package Bux\BlogBundle\Form\Type
 */
class NewPostCategoryFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\BlogBundle\Entity\BlogCategory',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'new_post_category_form_type';
    }
} 