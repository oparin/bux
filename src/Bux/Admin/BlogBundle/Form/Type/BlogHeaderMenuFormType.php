<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/19/14
 * Time: 3:34 PM
 */

namespace Bux\Admin\BlogBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class BlogHeaderMenuFormType
 *
 * @package Bux\Admin\BlogBundle\Form\Type
 */
class BlogHeaderMenuFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('menu', 'collection', array(
                'type'   => new HeaderMenuFormType()
            ));
    }

//    /**
//     * @param OptionsResolverInterface $resolver
//     */
//    public function setDefaultOptions(OptionsResolverInterface $resolver)
//    {
//        $resolver->setDefaults(array(
//            'data_class' => 'Bux\Admin\BlogBundle\Entity\BlogHeaderMenu',
//        ));
//    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'blog_header_menu_form_type';
    }
}